class GraphAnalyzer {
  constructor(graph) {
    this.graph = graph;
  }

  analyze() {
    const nodes = this.graph.getNodes();
    const edges = this.graph.getEdges();

    const result = {
      counts: {
        nodes: nodes.length,
        edges: edges.length,
        workspaces: nodes.filter(n => n.type === 'workspace').length,
        directories: nodes.filter(n => n.type === 'directory').length,
        files: nodes.filter(n => n.type === 'file').length,
        artifacts: nodes.filter(n => n.type === 'artifact').length,
        dependencies: edges.filter(e => e.type === 'depends_on').length
      },
      orphans: this._findOrphans(nodes, edges),
      circularDependencies: this._findCircularDependencies(nodes, edges),
      connectedComponents: this._countConnectedComponents(nodes, edges)
    };

    return result;
  }

  _findOrphans(nodes, edges) {
    const connectedNodes = new Set();
    edges.forEach(e => {
      connectedNodes.add(e.from);
      connectedNodes.add(e.to);
    });

    return nodes
      .filter(n => n.type !== 'workspace' && !connectedNodes.has(n.id))
      .map(n => n.id);
  }

  _findCircularDependencies(nodes, edges) {
    // Only look at depends_on or imports edges for circular dep
    const depEdges = edges.filter(e => e.type === 'depends_on' || e.type === 'imports');
    
    // Build adjacency list
    const adjList = new Map();
    nodes.forEach(n => adjList.set(n.id, []));
    depEdges.forEach(e => {
      if (adjList.has(e.from)) {
        adjList.get(e.from).push(e.to);
      }
    });

    const visited = new Set();
    const recStack = new Set();
    const cycles = [];

    const detectCycle = (nodeId, path) => {
      if (!visited.has(nodeId)) {
        visited.add(nodeId);
        recStack.add(nodeId);
        path.push(nodeId);

        const neighbors = adjList.get(nodeId) || [];
        for (const neighbor of neighbors) {
          if (!visited.has(neighbor)) {
            if (detectCycle(neighbor, [...path])) return true;
          } else if (recStack.has(neighbor)) {
            // Cycle found
            const cycleStartIdx = path.indexOf(neighbor);
            cycles.push(path.slice(cycleStartIdx));
          }
        }
      }
      recStack.delete(nodeId);
      return false;
    };

    for (const node of nodes) {
      if (!visited.has(node.id)) {
        detectCycle(node.id, []);
      }
    }

    return cycles;
  }

  _countConnectedComponents(nodes, edges) {
    const adjList = new Map();
    nodes.forEach(n => adjList.set(n.id, []));
    edges.forEach(e => {
      if (adjList.has(e.from)) adjList.get(e.from).push(e.to);
      if (adjList.has(e.to)) adjList.get(e.to).push(e.from); // undirected for connected components
    });

    const visited = new Set();
    let components = 0;

    const dfs = (nodeId) => {
      visited.add(nodeId);
      const neighbors = adjList.get(nodeId) || [];
      for (const neighbor of neighbors) {
        if (!visited.has(neighbor)) {
          dfs(neighbor);
        }
      }
    };

    for (const node of nodes) {
      if (!visited.has(node.id)) {
        components++;
        dfs(node.id);
      }
    }

    return components;
  }
}

module.exports = { GraphAnalyzer };
