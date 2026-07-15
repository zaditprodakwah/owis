/**
 * Context Builder
 * PURE, deterministic composition of existing OWIS artifacts into a canonical LLM Context payload.
 */

function buildContext(payloads = {}, sourcesMap = {}) {
  const { workspace = {}, wir = {}, graph = {}, lint = {} } = payloads;

  // Enforce determinism by sorting keys where appropriate, though we can just map fixed keys.
  
  const context = {
    contextVersion: "0.2.0",
    generatedAt: new Date().toISOString(),
    sources: sourcesMap,
    workspace: {
      name: workspace.name || wir.name || "unknown",
      version: workspace.version || "unknown",
      description: workspace.description || "",
      languages: wir.languages || []
    },
    architecture: {
      style: wir.architecture ? wir.architecture.style : 'unknown',
      patterns: wir.architecture ? wir.architecture.patterns : [],
      modules: wir.architecture ? wir.architecture.modules : [],
      layers: wir.architecture ? wir.architecture.layers : [],
      dependencies: wir.dependencies || {}
    },
    graph: {
      summary: graph.summary || {},
      nodes: graph.nodes || [],
      edges: graph.edges || []
    },
    quality: {
      lintSummary: lint.summary || {},
      issues: lint.issues || []
    },
    constraints: wir.constraints || {},
    metadata: wir.metadata || {}
  };

  // Clean empty sections from sources map
  for (const k in context.sources) {
    if (!context.sources[k]) {
      delete context.sources[k];
    }
  }

  return context;
}

module.exports = {
  buildContext
};
