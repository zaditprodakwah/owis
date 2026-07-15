class GraphRegistry {
  constructor() {
    this.nodes = new Set([
      'workspace',
      'package',
      'directory',
      'file',
      'module',
      'artifact'
    ]);
    
    this.edges = new Set([
      'contains',
      'imports',
      'depends_on',
      'references',
      'generates'
    ]);
  }

  isValidNode(type) {
    return this.nodes.has(type);
  }

  isValidEdge(type) {
    return this.edges.has(type);
  }
}

module.exports = new GraphRegistry();
