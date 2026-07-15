class GraphSerializer {
  static serialize(graph) {
    return {
      version: '0.2.0',
      nodes: graph.getNodes().map(n => ({
        id: n.id,
        type: n.type,
        label: n.label,
        metadata: n.metadata
      })),
      edges: graph.getEdges().map(e => ({
        from: e.from,
        to: e.to,
        type: e.type,
        metadata: e.metadata
      }))
    };
  }
}

module.exports = { GraphSerializer };
