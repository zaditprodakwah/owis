const { test } = require('node:test');
const assert = require('node:assert');
const path = require('node:path');
const { parseWorkspace } = require('../src/parser');

test('Valid Workspace (simple-node-app)', (t) => {
  const target = path.join(__dirname, '../../examples/simple-node-app');
  const wir = parseWorkspace(target);
  
  assert.ok(wir, 'WIR should be generated');
  assert.equal(wir.project.version, '0.1.0', 'Project version matches');
  assert.ok(wir.technology.languages.includes('JavaScript'), 'Node/JS stack detected');
});
