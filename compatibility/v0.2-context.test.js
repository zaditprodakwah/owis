const test = require('node:test');
const assert = require('node:assert');
const path = require('path');
const fs = require('fs');
const { buildContext } = require('../context/builder');

test('v0.2 context consumes v0.1 artifacts seamlessly', (t) => {
  const target = path.join(__dirname, '../fixtures/golden/simple');
  if (fs.existsSync(path.join(target, 'wir.json'))) {
    const payloads = {
      workspace: JSON.parse(fs.readFileSync(path.join(target, 'workspace.json'), 'utf8')),
      wir: JSON.parse(fs.readFileSync(path.join(target, 'wir.json'), 'utf8')),
      graph: JSON.parse(fs.readFileSync(path.join(target, 'wir.graph.json'), 'utf8'))
    };
    const ctx = buildContext(payloads, { wir: 'wir.json', graph: 'wir.graph.json', workspace: 'workspace.json' });
    assert.ok(ctx);
    assert.strictEqual(ctx.contextVersion, '0.2.0');
  }
});
