const test = require('node:test');
const assert = require('node:assert');
const { buildContext } = require('../builder');

test('Builder deterministic output', (t) => {
  const p = { workspace: { name: 'test' }, wir: { version: '1.0' } };
  const s = { workspace: 'w.json', wir: 'wir.json' };
  
  const ctx = buildContext(p, s);
  assert.strictEqual(ctx.workspace.name, 'test');
  assert.strictEqual(ctx.sources.workspace, 'w.json');
  assert.strictEqual(ctx.contextVersion, '0.2.0');
});
