const test = require('node:test');
const assert = require('node:assert');
const path = require('path');
const { validate } = require('../runtime/src/validator');
const fs = require('fs');

test('v0.1 runtime artifact validates against schemas', (t) => {
  const target = path.join(__dirname, '../fixtures/golden/simple/wir.json');
  if (fs.existsSync(target)) {
    const data = JSON.parse(fs.readFileSync(target, 'utf8'));
    const res = validate('wir', data);
    assert.strictEqual(res.valid, true);
  }
});
