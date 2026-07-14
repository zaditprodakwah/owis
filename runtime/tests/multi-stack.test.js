const { test } = require('node:test');
const assert = require('node:assert');
const path = require('node:path');
const { parseWorkspace } = require('../src/parser');

test('Multi-stack Workspace', (t) => {
  const target = path.join(__dirname, '../../examples/multi-stack-workspace');
  const wir = parseWorkspace(target);
  
  assert.ok(wir, 'WIR should be generated');
  assert.ok(wir.technology.languages.includes('JavaScript'), 'JS stack detected');
  assert.ok(wir.technology.languages.includes('Python'), 'Python stack detected');
});
