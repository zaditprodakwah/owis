const registry = require('./registry');

class Graph {
  constructor() {
    this.nodes = new Map(); // id -> node object
    this.edges = []; // array of edge objects
  }

  addNode(id, type, label, metadata = {}) {
    if (!registry.isValidNode(type)) {
      throw new Error(`Invalid node type: ${type}`);
    }
    if (this.nodes.has(id)) {
      return this.nodes.get(id); // Idempotent add
    }
    const node = { id, type, label, metadata };
    this.nodes.set(id, node);
    return node;
  }

  addEdge(from, to, type, metadata = {}) {
    if (!registry.isValidEdge(type)) {
      throw new Error(`Invalid edge type: ${type}`);
    }
    if (!this.nodes.has(from)) {
      throw new Error(`Edge source node not found: ${from}`);
    }
    if (!this.nodes.has(to)) {
      throw new Error(`Edge target node not found: ${to}`);
    }
    
    // Check if exact edge already exists to prevent duplicates
    const exists = this.edges.some(e => e.from === from && e.to === to && e.type === type);
    if (!exists) {
      const edge = { from, to, type, metadata };
      this.edges.push(edge);
      return edge;
    }
    return this.edges.find(e => e.from === from && e.to === to && e.type === type);
  }

  getNodes() {
    return Array.from(this.nodes.values());
  }

  getEdges() {
    return [...this.edges];
  }
}

module.exports = Graph;
