const test = require('node:test');
const assert = require('node:assert');
const path = require('path');
const fs = require('fs');
const { parseGraph, serializeGraph } = require('../graph/index');

test('v0.2 graph generator consumes v0.1 WIR seamlessly', (t) => {
  const target = path.join(__dirname, '../fixtures/golden/simple');
  if (fs.existsSync(path.join(target, 'wir.json'))) {
    const wir = JSON.parse(fs.readFileSync(path.join(target, 'wir.json'), 'utf8'));
    const graph = parseGraph(target, wir);
    const graphData = serializeGraph(graph);
    assert.ok(graphData.nodes.length > 0);
  }
});
