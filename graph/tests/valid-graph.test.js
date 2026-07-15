const assert = require('assert');
const path = require('path');
const { parseGraph, analyzeGraph, serializeGraph } = require('../index');

const MOCK_WIR = {
  project: { name: 'test-workspace', version: '1.0.0' },
  artifacts: [
    { path: 'src/main.js', description: 'Main entry' },
    { path: 'src/utils.js', description: 'Utils' }
  ],
  dependencies: [
    { from: 'src/main.js', to: 'src/utils.js' }
  ]
};

// Create a mock workspace directory physically since extractor reads directories
const fs = require('fs');
const os = require('os');
const tmpdir = fs.mkdtempSync(path.join(os.tmpdir(), 'owis-valid-'));
fs.mkdirSync(path.join(tmpdir, 'src'));
fs.writeFileSync(path.join(tmpdir, 'src', 'main.js'), '');
fs.writeFileSync(path.join(tmpdir, 'src', 'utils.js'), '');

try {
  const graph = parseGraph(tmpdir, MOCK_WIR);
  const analysis = analyzeGraph(graph);
  const serialized = serializeGraph(graph);
  
  assert.strictEqual(serialized.version, '0.2.0');
  
  // Workspace node + src dir + main.js + utils.js + 2 artifacts = 6 nodes
  assert.strictEqual(analysis.counts.nodes, 6);
  // contains edges + references edges + 1 depends_on = varies, but verify > 0
  assert.ok(analysis.counts.edges > 0);
  assert.strictEqual(analysis.counts.dependencies, 1);
  
  console.log('[PASS] Valid graph generation');
} catch (e) {
  console.error('[FAIL] Valid graph generation', e);
  process.exit(1);
}
