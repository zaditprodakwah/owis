const assert = require('assert');
const path = require('path');
const { parseGraph, analyzeGraph } = require('../index');

const MOCK_WIR = {
  project: { name: 'circular-test', version: '1.0.0' },
  artifacts: [
    { path: 'a.js' },
    { path: 'b.js' },
    { path: 'c.js' }
  ],
  dependencies: [
    { from: 'a.js', to: 'b.js' },
    { from: 'b.js', to: 'c.js' },
    { from: 'c.js', to: 'a.js' }
  ]
};

const fs = require('fs');
const os = require('os');
const tmpdir = fs.mkdtempSync(path.join(os.tmpdir(), 'owis-circ-'));
fs.writeFileSync(path.join(tmpdir, 'a.js'), '');
fs.writeFileSync(path.join(tmpdir, 'b.js'), '');
fs.writeFileSync(path.join(tmpdir, 'c.js'), '');

try {
  const graph = parseGraph(tmpdir, MOCK_WIR);
  const analysis = analyzeGraph(graph);
  
  assert.ok(analysis.circularDependencies.length > 0, 'Should detect circular dependency');
  
  console.log('[PASS] Circular dependency detection');
} catch (e) {
  console.error('[FAIL] Circular dependency detection', e);
  process.exit(1);
}
