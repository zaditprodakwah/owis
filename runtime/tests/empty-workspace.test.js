const { test } = require('node:test');
const assert = require('node:assert');
const path = require('node:path');
const { parseWorkspace } = require('../src/parser');

test('Empty Workspace', (t) => {
  const target = path.join(__dirname, '../../examples/empty-workspace');
  const wir = parseWorkspace(target);
  
  assert.ok(wir, 'WIR should be generated even for empty workspace');
  assert.equal(wir.technology.languages.length, 0, 'No stack should be detected');
});
