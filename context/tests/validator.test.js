const test = require('node:test');
const assert = require('node:assert');
const { validateContext } = require('../validator');

test('Validator validates context schema', (t) => {
  const valid = { contextVersion: "0.2.0", generatedAt: new Date().toISOString(), sources: {} };
  const res = validateContext(valid);
  assert.strictEqual(res.valid, true);
  
  const invalid = { contextVersion: "0.1.0" }; // invalid version
  const res2 = validateContext(invalid);
  assert.strictEqual(res2.valid, false);
});
