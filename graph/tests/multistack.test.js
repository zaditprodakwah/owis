const assert = require('assert');
const path = require('path');
const { parseGraph, analyzeGraph } = require('../index');

const MOCK_WIR = {
  project: { name: 'multistack', version: '1.0.0' },
  artifacts: [
    { path: 'backend/main.go' },
    { path: 'frontend/index.js' }
  ],
  dependencies: [
    { from: 'frontend/index.js', to: 'backend/main.go' }
  ]
};

const fs = require('fs');
const os = require('os');
const tmpdir = fs.mkdtempSync(path.join(os.tmpdir(), 'owis-multi-'));
fs.mkdirSync(path.join(tmpdir, 'backend'));
fs.mkdirSync(path.join(tmpdir, 'frontend'));
fs.writeFileSync(path.join(tmpdir, 'backend', 'main.go'), '');
fs.writeFileSync(path.join(tmpdir, 'frontend', 'index.js'), '');

try {
  const graph = parseGraph(tmpdir, MOCK_WIR);
  const analysis = analyzeGraph(graph);
  
  assert.strictEqual(analysis.counts.workspaces, 1);
  assert.strictEqual(analysis.counts.directories, 2);
  assert.strictEqual(analysis.counts.files, 2);
  assert.strictEqual(analysis.counts.artifacts, 2);
  assert.strictEqual(analysis.counts.dependencies, 1);
  
  console.log('[PASS] Multi-stack graph generation');
} catch (e) {
  console.error('[FAIL] Multi-stack graph generation', e);
  process.exit(1);
}
