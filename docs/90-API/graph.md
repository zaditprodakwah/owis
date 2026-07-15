# OWIS Graph API Contract

**Package:** `@prodakwah/owis-graph`  
**Version:** 0.2.0  
**Status:** FROZEN (v0.2.0-rc.1)

## Overview

The OWIS Graph package extracts, analyzes, and serializes a dependency/topology graph from a workspace and its WIR. The output (`wir.graph.json`) represents the structural relationships between workspace files, directories, modules, and packages as a directed graph.

## Installation

```
npm install @prodakwah/owis-graph
```

## Exports

```js
const { parseGraph, analyzeGraph, serializeGraph, GraphExtractor, GraphAnalyzer, GraphSerializer } = require('@prodakwah/owis-graph');
```

Entry point: `index.js`

---

## `parseGraph(workspaceRoot, wir)`

Extracts a `Graph` from a workspace directory and its WIR.

### parseGraph(workspaceRoot, wir) Signature

```ts
parseGraph(workspaceRoot: string, wir: WIR): Graph
```

### parseGraph(workspaceRoot, wir) Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `workspaceRoot` | `string` | Yes | Absolute path to the workspace root. |
| `wir` | `WIR` | Yes | A parsed WIR object. |

### parseGraph(workspaceRoot, wir) Return Value

An internal opaque `Graph` object. Do not serialize directly; use `serializeGraph`.

### parseGraph(workspaceRoot, wir) Errors

| Condition | Behavior |
|-----------|----------|
| `workspaceRoot` does not exist | Throws `Error: Workspace path does not exist: <path>` |
| `wir` is null or not an object | Throws `TypeError` |

### parseGraph(workspaceRoot, wir) Example

```js
const { parseGraph, serializeGraph } = require('@prodakwah/owis-graph');

const graph = parseGraph('/absolute/path/to/workspace', wir);
const graphData = serializeGraph(graph);
```

---

## `analyzeGraph(graph)`

Analyzes a `Graph` and returns structural statistics.

### analyzeGraph(graph) Signature

```ts
analyzeGraph(graph: Graph): GraphAnalysis
```

### analyzeGraph(graph) Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `graph` | `Graph` | Yes | Internal `Graph` object from `parseGraph`. |

### analyzeGraph(graph) Return Value

```ts
interface GraphAnalysis {
  counts: {
    nodes: number;
    edges: number;
  };
  nodesByType: Record<string, number>;  // e.g. { "file": 5, "directory": 2, "workspace": 1 }
  hasCycles: boolean;
  isolatedNodes: string[];              // Node IDs with no edges
}
```

### analyzeGraph(graph) Example

```js
const analysis = analyzeGraph(graph);
console.log(`Nodes: ${analysis.counts.nodes}`);
console.log(`Edges: ${analysis.counts.edges}`);
console.log(`Has cycles: ${analysis.hasCycles}`);
```

---

## `serializeGraph(graph)`

Serializes a `Graph` to the canonical `wir.graph.json` JSON representation.

### serializeGraph(graph) Signature

```ts
serializeGraph(graph: Graph): SerializedGraph
```

### serializeGraph(graph) Return Value

```ts
interface SerializedGraph {
  version: string;  // "0.2.0"
  nodes: GraphNode[];
  edges: GraphEdge[];
}

interface GraphNode {
  id: string;       // Unique node identifier, format: "<type>:<label>"
  type: NodeType;
  label: string;
  metadata: Record<string, any>;
}

interface GraphEdge {
  from: string;     // Source node ID
  to: string;       // Target node ID
  type: EdgeType;
  metadata: Record<string, any>;
}

type NodeType = "workspace" | "directory" | "file" | "module" | "package" | "artifact";
type EdgeType = "contains" | "imports" | "depends_on" | "references" | "generates";
```

### Determinism

`serializeGraph` produces a deterministic output:
- Nodes sorted by `id` alphabetically.
- Edges sorted by `from` then `to` alphabetically.
- All `metadata` object keys sorted alphabetically.

### serializeGraph(graph) Example

```js
const serialized = serializeGraph(graph);
fs.writeFileSync('wir.graph.json', JSON.stringify(serialized, null, 2), 'utf8');
```

---

## Node ID Format

Node IDs follow the pattern: `<type>:<path-or-label>`

| Node Type | Example ID |
|-----------|-----------|
| workspace | `workspace:my-app` |
| directory | `dir:src/components` |
| file | `file:src/index.js` |
| module | `module:express` |
| package | `package:my-lib` |
| artifact | `artifact:dist/bundle.js` |

---

## Classes (Advanced Usage)

### `GraphExtractor`

```js
const { GraphExtractor } = require('@prodakwah/owis-graph');
const extractor = new GraphExtractor();
const graph = extractor.extract(workspaceRoot, wir);
```

### `GraphAnalyzer`

```js
const { GraphAnalyzer } = require('@prodakwah/owis-graph');
const analyzer = new GraphAnalyzer(graph);
const analysis = analyzer.analyze();
```

### `GraphSerializer`

```js
const { GraphSerializer } = require('@prodakwah/owis-graph');
const serialized = GraphSerializer.serialize(graph);
```

These class constructors and method signatures are frozen as public API.

---

## Compatibility Guarantee

- `SerializedGraph` format (`version`, `nodes`, `edges` shape) is frozen.
- `GraphNode` and `GraphEdge` property names are frozen.
- The set of valid `NodeType` and `EdgeType` values may be extended in minor releases; existing values are frozen.
- `parseGraph`, `analyzeGraph`, `serializeGraph` function signatures are frozen.
- v0.1.x WIR objects are valid inputs to `parseGraph` in all v0.2.x releases.
