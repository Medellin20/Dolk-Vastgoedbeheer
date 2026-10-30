const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const ts = require('typescript');

function setup({ storageError = null, insertError = null } = {}) {
  const removed = [];
  const inserted = [];
  const bucket = {
    upload: async () => ({ error: storageError }),
    getPublicUrl: () => ({ data: { publicUrl: 'https://example.invalid/test.png' } }),
    remove: async paths => { removed.push(...paths); return { error: null }; },
  };
  const client = { storage: { from: () => bucket }, from(table) {
    const q = {
      select: () => q, eq: () => q, order: () => q, limit: () => q,
      maybeSingle: async () => ({ data: table === 'properties' ? { slug: 'test-property' } : null }),
      insert: data => { inserted.push(data); return q; },
      single: async () => ({ data: insertError ? null : { id: 'image-1' }, error: insertError }),
      then: resolve => resolve({ count: 0, error: null }),
    };
    return q;
  }};
  const deps = {
    'next/cache': { revalidatePath() {} }, 'node:crypto': require('node:crypto'),
    '@/lib/supabase/admin': { createAdminClient: () => client },
    '@/lib/data/history': { logAdminAction: async () => {} },
  };
  const context = { exports: {}, File, console: { error() {} }, require: name => deps[name] };
  vm.runInNewContext(ts.transpileModule(fs.readFileSync('actions/admin-images.ts', 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2017 },
  }).outputText, context);
  const upload = async (file = new File(['image'], 'test.png', { type: 'image/png' })) => context.exports.uploadPropertyImages('property-1', { getAll: () => [file] });
  return { upload, removed, inserted };
}

test('missing bucket is reported as storage failure instead of invalid file format', async () => {
  const { upload, inserted } = setup({ storageError: { message: 'Bucket not found' } });
  const result = await upload();
  assert.equal(result.success, false);
  assert.match(result.message, /bucket property-images/);
  assert.equal(inserted.length, 0);
});
test('database insert failure cleans up uploaded object and reports the database step', async () => {
  const { upload, removed } = setup({ insertError: { message: 'database error' } });
  const result = await upload();
  assert.equal(result.success, false);
  assert.match(result.message, /base a échoué/);
  assert.equal(removed.length, 1);
});
test('valid image creates a primary photo record and invalid MIME does not reach the database', async () => {
  const { upload, inserted } = setup();
  assert.equal((await upload()).success, true);
  assert.equal(inserted[0].is_primary, true);
  const invalid = await upload(new File(['text'], 'test.txt', { type: 'text/plain' }));
  assert.equal(invalid.success, false);
  assert.match(invalid.message, /Format non pris en charge/);
  assert.equal(inserted.length, 1);
});
