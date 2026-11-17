const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const ts = require('typescript');

function load(file, dependencies) {
  const context = { exports: {}, console, require(name) {
    if (!(name in dependencies)) throw new Error(`Unexpected dependency: ${name}`);
    return dependencies[name];
  }};
  vm.runInNewContext(ts.transpileModule(fs.readFileSync(file, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2017 },
  }).outputText, context);
  return context.exports;
}
const validations = load('lib/validations/admin.ts', { zod: require('zod') });
const input = { footerPhone: '+31612345678', paymentLink: 'https://example.com/pay',
  showPaymentLink: true, viewingFee: 50, showOnConfirmations: false };

test('payment reason trims whitespace, accepts legacy settings, and rejects overlong values', () => {
  assert.equal(validations.siteSettingsSchema.parse(input).paymentReason, '');
  assert.equal(validations.siteSettingsSchema.parse({ ...input, paymentReason: '  Dossier 123  ' }).paymentReason, 'Dossier 123');
  assert.equal(validations.siteSettingsSchema.safeParse({ ...input, paymentReason: 'x'.repeat(141) }).success, false);
});

test('admin save persists the reason, public settings read it, and clearing it removes the instruction', async () => {
  let row;
  const query = { update(value) { row = value; return this; }, eq() { return this; },
    select() { return this; }, returns() { return this; },
    maybeSingle: async () => ({ data: row, error: null }),
    then(resolve) { resolve({ error: null }); } };
  const client = { from: () => query };
  const { updateSiteSettings } = load('actions/site-settings.ts', {
    'next/cache': { revalidatePath() {} },
    '@/lib/supabase/admin': { createAdminClient: () => client },
    '@/lib/data/history': { logAdminAction: async () => {} },
    '@/lib/validations/admin': validations,
  });
  const { getSiteSettings } = load('lib/data/site-settings.ts', {
    '@/lib/supabase/server': { createClient: () => client },
  });
  assert.equal((await updateSiteSettings({ ...input, paymentReason: '  Dossier 123  ' })).success, true);
  assert.equal((await getSiteSettings()).payment_reason, 'Dossier 123');
  await updateSiteSettings({ ...input, paymentReason: '' });
  assert.equal((await getSiteSettings()).payment_reason, '');
});
