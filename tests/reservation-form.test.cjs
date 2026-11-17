const { test } = require('node:test');
const assert = require('node:assert/strict');
const vm = require('node:vm');
const fs = require('node:fs');
const ts = require('typescript');

function harness(send) {
  let step = 0;
  const ref = { current: false };
  const errors = [], redirects = [], phoneValues = [];
  let submit;
  const React = {
    createElement: (type, props, ...children) => ({ type, props: props || {}, children }),
    useState: () => [step, (value) => { step = value; }],
    useRef: () => ref,
  };
  const dependencies = {
    react: React,
    'next/navigation': { useRouter: () => ({ replace: (url) => redirects.push(url) }) },
    'react-hook-form': { useForm: () => ({
      register: (name) => ({ onChange: (event) => { if (name === 'phone') phoneValues.push(event.target.value); } }), trigger: async () => true,
      handleSubmit: (callback) => { submit = callback; return async () => callback({ monthlyIncome: 2345.67 }); },
      setError: () => {}, formState: { errors: {}, isSubmitting: false },
    }) },
    '@hookform/resolvers/zod': { zodResolver: () => ({}) },
    'framer-motion': { motion: { div: 'motion.div' }, AnimatePresence: 'presence' },
    sonner: { toast: { error: (message) => errors.push(message) } },
    '@/actions/reservations': { createReservation: send },
    '@/lib/validations/reservation': {},
    '@/lib/utils/cn': { cn: () => '' },
    '@/lib/utils/phone': { formatDutchPhoneInput: (value) => '+31 ' + value.replace(/^0/, '') },
  };
  const context = { exports: {}, require: (name) => dependencies[name] || {} };
  vm.runInNewContext(ts.transpileModule(fs.readFileSync('components/forms/reservation-form.tsx', 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.React },
  }).outputText, context);
  const render = () => context.exports.ReservationForm({ propertyId: 'id', confirmationUrl: '/confirmation' });
  function find(node, predicate) {
    if (!node || typeof node !== 'object') return;
    if (predicate(node)) return node;
    return (node.children || []).flat(Infinity).map((child) => find(child, predicate)).find(Boolean);
  }
  return { render, find, errors, redirects, phoneValues, getSubmit: () => submit };
}

test('Enter advances the first step; final submission uses full validation and one animated panel', async () => {
  let calls = 0;
  const h = harness(async () => { calls++; return { success: true }; });
  h.find(h.render(), (n) => n.type === 'form').props.onSubmit({ preventDefault() {} });
  await new Promise(setImmediate);
  assert.equal(calls, 0);
  const second = h.render();
  const presence = h.find(second, (n) => n.type === 'presence');
  assert.equal(presence.children.filter(Boolean).length, 1);
  h.find(second, (n) => n.type === 'form').props.onSubmit({ preventDefault() {} });
  await new Promise(setImmediate);
  assert.equal(calls, 1);
  assert.deepEqual(h.redirects, ['/confirmation']);
});

test('concurrent submissions send once and a network error permits retry', async () => {
  let calls = 0, reject;
  const h = harness(() => { calls++; return new Promise((_, fail) => { reject = fail; }); });
  h.find(h.render(), (n) => n.type === 'form').props.onSubmit({ preventDefault() {} });
  await new Promise(setImmediate);
  h.find(h.render(), (n) => n.type === 'form').props.onSubmit({ preventDefault() {} });
  const submit = h.getSubmit();
  await submit({});
  assert.equal(calls, 1);
  reject(new Error('offline'));
  await new Promise(setImmediate);
  assert.equal(h.errors.length, 1);
  assert.equal(h.redirects.length, 0);
  const retry = submit({});
  assert.equal(calls, 2);
  reject(new Error('offline'));
  await retry;
});

 test('phone formatting reaches form state before validation and submission', () => {
  const h = harness(async () => ({ success: true }));
  const phone = h.find(h.render(), (node) => node.props.id === 'phone');
  const event = { target: { value: '0612345678' } };
  phone.props.onChange(event);
  assert.equal(event.target.value, '+31 612345678');
  assert.deepEqual(h.phoneValues, ['+31 612345678']);
});
