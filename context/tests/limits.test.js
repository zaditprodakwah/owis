const test = require('node:test');
const assert = require('node:assert');
const { sanitizeContext } = require('../sanitizer');
const limits = require('../limits');

test('Budget enforcement metadata size', (t) => {
  const ctx = { metadata: { huge: 'a'.repeat(limits.MAX_METADATA_SIZE_BYTES + 10) }, graph: { nodes: [] } };
  const { context } = sanitizeContext(ctx);
  assert.strictEqual(context._truncated, true);
  assert.ok(context.metadata._redacted.includes('exceeded'));
});
