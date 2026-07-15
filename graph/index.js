const { GraphExtractor } = require('./extractor');
const { GraphAnalyzer } = require('./analyzer');
const { GraphSerializer } = require('./serializer');

/**
 * Extracts a WIR Graph from a given workspace and its WIR.
 * @param {string} workspaceRoot
 * @param {object} wir
 * @returns {Graph}
 */
function parseGraph(workspaceRoot, wir) {
  const extractor = new GraphExtractor();
  return extractor.extract(workspaceRoot, wir);
}

/**
 * Analyzes the WIR Graph.
 * @param {Graph} graph
 * @returns {object}
 */
function analyzeGraph(graph) {
  const analyzer = new GraphAnalyzer(graph);
  return analyzer.analyze();
}

/**
 * Serializes the WIR Graph to JSON representation.
 * @param {Graph} graph
 * @returns {object}
 */
function serializeGraph(graph) {
  return GraphSerializer.serialize(graph);
}

module.exports = {
  parseGraph,
  analyzeGraph,
  serializeGraph,
  GraphExtractor,
  GraphAnalyzer,
  GraphSerializer
};
