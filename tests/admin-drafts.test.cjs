const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const ts = require('typescript');

function load(file, dependencies, globals = {}) {
  const context = { exports: {}, ...globals, require(name) {
    if (!(name in dependencies)) throw new Error(`Unexpected dependency: ${name}`);
    return dependencies[name];
  }};
  vm.runInNewContext(ts.transpileModule(fs.readFileSync(file, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2017, jsx: ts.JsxEmit.ReactJSX },
  }).outputText, context);
  return context.exports;
}

function harness(storage = new Map()) {
  const cleanups = [];
  const sessionStorage = {
    getItem: key => storage.get(key) ?? null,
    setItem: (key, value) => storage.set(key, value),
    removeItem: key => storage.delete(key),
  };
  const { useAdminDraft } = load('lib/hooks/use-admin-draft.ts', {
    react: {
      useRef: current => ({ current }),
      useCallback: callback => callback,
      useEffect: effect => cleanups.push(effect()),
    },
  }, { sessionStorage });
  function mount(key, defaults, restore) {
    let values = { ...defaults };
    let listener;
    const form = {
      getValues: () => ({ ...values }),
      reset: restored => { values = restored; },
      watch: callback => { listener = callback; return { unsubscribe() { listener = undefined; } }; },
    };
    const saved = useAdminDraft(key, form, restore);
    return { saved, values: form.getValues, change(next) { values = { ...values, ...next }; listener?.(); } };
  }
  return { mount, storage, cleanups };
}

test('draft restores text, empty optional fields, zero values and checkbox state after remount', () => {
  const { mount, storage } = harness();
  const defaults = { title: '', floor: undefined, fee: 50, published: true };
  const first = mount('property:new', defaults);
  first.change({ title: 'Woning test', floor: '', fee: 0, published: false });
  let restores = 0;
  const second = mount('property:new', defaults, () => restores++);
  assert.equal(second.values().title, 'Woning test');
  assert.equal(second.values().floor, '');
  assert.equal(second.values().fee, 0);
  assert.equal(second.values().published, false);
  assert.equal(restores, 1);
  assert.ok(storage.has('property:new'));
});

test('property and settings drafts stay isolated and only successful saved snapshot is cleared', () => {
  const { mount, storage } = harness();
  const first = mount('property:1', { title: 'Original' });
  const second = mount('property:2', { title: 'Autre' });
  first.change({ title: 'Edited' });
  assert.equal(second.values().title, 'Autre');
  const submitted = first.values();
  first.change({ title: 'Newer edit during save' });
  first.saved(submitted);
  assert.ok(storage.has('property:1'));
  first.saved(first.values());
  assert.equal(storage.has('property:1'), false);
  assert.equal(mount('property:1', { title: 'Saved server value' }).values().title, 'Saved server value');
});

test('invalid or unavailable browser storage does not break a form', () => {
  const corrupt = harness(new Map([['settings', '{invalid json']]));
  assert.equal(corrupt.mount('settings', { phone: 'original' }).values().phone, 'original');
  const blocked = new Map();
  blocked.set = () => { throw new Error('quota exceeded'); };
  const form = harness(blocked).mount('settings', { phone: 'original' });
  assert.doesNotThrow(() => form.change({ phone: 'edited' }));
  assert.equal(form.values().phone, 'edited');
});

test('restoration ignores fields from another form and unsubscribes on unmount', () => {
  const { mount, cleanups, storage } = harness(new Map([['settings', '{"phone":"restored","unexpected":"ignored"}']]));
  const form = mount('settings', { phone: 'original' });
  assert.equal(form.values().unexpected, undefined);
  cleanups.forEach(cleanup => cleanup?.());
  storage.delete('settings');
  form.change({ phone: 'after unmount' });
  assert.equal(storage.has('settings'), false);
});

test('automatic refresh stays enabled for lists and disabled on all admin edit pages', () => {
  let pathname;
  const { AdminAutoRefresh } = load('components/admin/auto-refresh.tsx', {
    'next/navigation': { usePathname: () => pathname },
    '@/components/shared/status-auto-refresh': { StatusAutoRefresh() {} },
    'react/jsx-runtime': { jsx: (type, props) => ({ type, props }) },
  });
  for (pathname of ['/admin/parametres', '/admin/configuration-bancaire', '/admin/appartements/nouveau', '/admin/appartements/property-id']) {
    assert.equal(AdminAutoRefresh(), null, pathname);
  }
  for (pathname of ['/admin', '/admin/appartements', '/admin/visites', '/admin/reservations']) {
    assert.ok(AdminAutoRefresh(), pathname);
  }
});
