const assert = require('assert');
const path = require('path');
const { parseGraph, analyzeGraph } = require('../index');

const MOCK_WIR = {
  project: { name: 'empty-test', version: '1.0.0' }
};

const fs = require('fs');
const os = require('os');
const tmpdir = fs.mkdtempSync(path.join(os.tmpdir(), 'owis-empty-'));

try {
  const graph = parseGraph(tmpdir, MOCK_WIR);
  const analysis = analyzeGraph(graph);
  
  assert.strictEqual(analysis.counts.nodes, 1); // Only the workspace node
  assert.strictEqual(analysis.counts.edges, 0); // No edges
  
  console.log('[PASS] Empty workspace graph generation');
} catch (e) {
  console.error('[FAIL] Empty workspace graph generation', e);
  process.exit(1);
}
