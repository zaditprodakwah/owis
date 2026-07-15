const fs = require('fs');
const path = require('path');
const Graph = require('./graph');

const MAX_FILES = 10000;
const MAX_DIRS = 2000;
const MAX_NODES = 15000;
const MAX_EDGES = 50000;
const MAX_DEPTH = 20;

const IGNORED_DIRS = new Set([
  'node_modules',
  '.git',
  'dist',
  'build',
  'coverage',
  'vendor',
  '.cache',
  '.next'
]);

class GraphExtractor {
  constructor() {
    this.graph = new Graph();
    this.stats = {
      files: 0,
      dirs: 0
    };
  }

  extract(workspaceRoot, wir) {
    const rootId = 'workspace:' + path.basename(workspaceRoot);
    const projectName = wir.project?.name || path.basename(workspaceRoot);
    
    // Create workspace node
    this.graph.addNode(rootId, 'workspace', projectName, {
      version: wir.project?.version
    });

    // Extract file system graph
    this.traverseDirectory(workspaceRoot, workspaceRoot, rootId, 0);

    // Extract WIR artifacts
    if (wir.artifacts && Array.isArray(wir.artifacts)) {
      wir.artifacts.forEach(artifact => {
        const artifactId = 'artifact:' + artifact.path;
        
        // Add artifact node if not limit exceeded
        if (this.graph.nodes.size < MAX_NODES) {
          this.graph.addNode(artifactId, 'artifact', path.basename(artifact.path), {
            path: artifact.path,
            description: artifact.description
          });
          
          // Link workspace to artifact
          if (this.graph.edges.length < MAX_EDGES) {
             this.graph.addEdge(rootId, artifactId, 'contains');
          }

          // Link artifact to its physical file if it exists
          const fileId = 'file:' + artifact.path;
          if (this.graph.nodes.has(fileId) && this.graph.edges.length < MAX_EDGES) {
             this.graph.addEdge(artifactId, fileId, 'references');
          }
        }
      });
    }

    // Extract dependencies
    if (wir.dependencies && Array.isArray(wir.dependencies)) {
      wir.dependencies.forEach(dep => {
        const fromArtifactId = 'artifact:' + dep.from;
        const toArtifactId = 'artifact:' + dep.to;

        if (this.graph.nodes.has(fromArtifactId) && this.graph.nodes.has(toArtifactId)) {
           if (this.graph.edges.length < MAX_EDGES) {
             this.graph.addEdge(fromArtifactId, toArtifactId, 'depends_on');
           }
        }
      });
    }

    return this.graph;
  }

  traverseDirectory(baseDir, currentDir, parentNodeId, depth) {
    if (depth > MAX_DEPTH) return;
    if (this.stats.dirs >= MAX_DIRS || this.graph.nodes.size >= MAX_NODES) return;

    let entries = [];
    try {
      entries = fs.readdirSync(currentDir, { withFileTypes: true });
    } catch (e) {
      return;
    }

    for (const entry of entries) {
      if (IGNORED_DIRS.has(entry.name)) continue;

      const fullPath = path.join(currentDir, entry.name);
      const relPath = path.relative(baseDir, fullPath).replace(/\\/g, '/');
      
      if (entry.isDirectory()) {
        this.stats.dirs++;
        const dirId = 'dir:' + relPath;
        
        if (this.graph.nodes.size < MAX_NODES) {
          this.graph.addNode(dirId, 'directory', entry.name, { path: relPath });
          
          if (this.graph.edges.length < MAX_EDGES) {
            this.graph.addEdge(parentNodeId, dirId, 'contains');
          }
          
          this.traverseDirectory(baseDir, fullPath, dirId, depth + 1);
        }
      } else if (entry.isFile()) {
        this.stats.files++;
        if (this.stats.files > MAX_FILES) continue;

        const fileId = 'file:' + relPath;
        if (this.graph.nodes.size < MAX_NODES) {
          this.graph.addNode(fileId, 'file', entry.name, { path: relPath });
          
          if (this.graph.edges.length < MAX_EDGES) {
            this.graph.addEdge(parentNodeId, fileId, 'contains');
          }
        }
      }
    }
  }
}

module.exports = { GraphExtractor };
