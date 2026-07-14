const { test } = require('node:test');
const assert = require('node:assert');
const path = require('node:path');
const { parseWorkspace } = require('../src/parser');

test('Malformed Workspace (Invalid JSON)', (t) => {
  const target = path.join(__dirname, '../../examples/malformed-workspace');
  assert.throws(() => {
    parseWorkspace(target);
  }, /Unexpected string in JSON|Expected/, 'Parser should fail gracefully with invalid JSON');
});
