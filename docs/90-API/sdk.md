# OWIS SDK API Contract

**Package:** `@prodakwah/owis-sdk`  
**Version:** 0.2.0  
**Status:** FROZEN (v0.2.0-rc.1)

## Overview

The OWIS SDK provides a unified programmatic interface for all OWIS operations. It re-exports and wraps the runtime, graph, lint, and context packages behind a single stable API surface.

## Installation

```
npm install @prodakwah/owis-sdk
```

## Exports

```js
const sdk = require('@prodakwah/owis-sdk');
```

Entry point: `src/index.js`  
Type definitions: `src/index.d.ts`

---

## `parse(workspacePath)`

Parses a workspace and returns its WIR.

### parse(workspacePath) Signature

```ts
parse(workspacePath: string): WIR
```

### parse(workspacePath) Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `workspacePath` | `string` | Yes | Absolute or relative path to workspace root. |

### parse(workspacePath) Return Value

A `WIR` object. See [runtime.md](./runtime.md) for the full type definition.

### parse(workspacePath) Errors

Propagates all errors from `parseWorkspace`. See [runtime.md](./runtime.md#errors).

### parse(workspacePath) Example

```js
const { parse } = require('@prodakwah/owis-sdk');
const wir = parse('./my-project');
console.log(wir.project.name);
```

---

## `check(schemaName, data)`

Validates data against an OWIS JSON schema.

### check(schemaName, data) Signature

```ts
check(schemaName: string, data: object): ValidationResult
```

### check(schemaName, data) Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `schemaName` | `string` | Yes | Schema name: `"wir"`, `"workspace"`, `"uars"`, `"artifact"`, `"dependency"`, `"knowledge"` |
| `data` | `object` | Yes | Payload to validate. |

### check(schemaName, data) Return Value

```ts
interface ValidationResult {
  valid: boolean;
  errors: AjvError[] | null;
}
```

### check(schemaName, data) Example

```js
const { check } = require('@prodakwah/owis-sdk');
const result = check('wir', wir);
if (!result.valid) console.error(result.errors);
```

---

## `parseGraph(workspaceRoot, wir)`

Extracts a WIR Graph from a workspace directory and its WIR.

### parseGraph(workspaceRoot, wir) Signature

```ts
parseGraph(workspaceRoot: string, wir: WIR): Graph
```

### parseGraph(workspaceRoot, wir) Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `workspaceRoot` | `string` | Yes | Absolute path to workspace directory. |
| `wir` | `WIR` | Yes | A parsed WIR object. |

### parseGraph(workspaceRoot, wir) Return Value

An internal `Graph` object. Pass to `serializeGraph` to get the JSON representation.

---

## `analyzeGraph(graph)`

Analyzes a `Graph` object and returns statistics.

### analyzeGraph(graph) Signature

```ts
analyzeGraph(graph: Graph): GraphAnalysis
```

### analyzeGraph(graph) Return Value

```ts
interface GraphAnalysis {
  counts: {
    nodes: number;
    edges: number;
  };
  nodesByType: Record<string, number>;
  hasCycles: boolean;
  isolatedNodes: string[];
}
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
  version: string;  // e.g. "0.2.0"
  nodes: Array<{
    id: string;
    type: string;
    label: string;
    metadata: Record<string, any>;
  }>;
  edges: Array<{
    from: string;
    to: string;
    type: string;
    metadata: Record<string, any>;
  }>;
}
```

---

## `lint`

The lint sub-module, providing `engine`, `registry`, `formatter`, `Diagnostic`, and `loadDefaultRules`.

### Usage

```js
const { lint } = require('@prodakwah/owis-sdk');
lint.loadDefaultRules();
const result = lint.engine.lint({}, wir);
const output = lint.formatter.formatCLI(result, workspacePath);
```

See [lint.md](./lint.md) for the full lint API contract.

---

## `buildContext(payloads, sourcesMap)`

Builds a raw context payload from one or more OWIS artifacts.

### buildContext(payloads, sourcesMap) Signature

```ts
buildContext(
  payloads: {
    workspace?: WorkspaceJSON;
    wir?: WIR;
    graph?: SerializedGraph;
    lint?: LintResult;
  },
  sourcesMap: Record<string, string>
): RawContext
```

### buildContext(payloads, sourcesMap) Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payloads` | `object` | Yes | Any combination of OWIS artifacts. At least one required. |
| `sourcesMap` | `object` | Yes | Map of artifact type → filename (used for provenance tracking). |

### buildContext(payloads, sourcesMap) Return Value

A `RawContext` object ready for sanitization. Do not serialize directly; pass through `sanitizeContext` first.

---

## `sanitizeContext(context)`

Sanitizes a raw context object, redacting secrets, filtering paths, detecting prompt injections, and enforcing budget limits.

### sanitizeContext(context) Signature

```ts
sanitizeContext(context: RawContext): SanitizeResult
```

### sanitizeContext(context) Return Value

```ts
interface SanitizeResult {
  context: SanitizedContext;
  diagnostics: Array<{
    stage: string;
    message: string;
  }>;
}
```

The returned `context` has `_truncated: boolean` set to `true` if any budget limit was enforced.

### Security Behavior

| Threat | Response |
|--------|----------|
| Secrets (API keys, tokens, passwords) | Replaced with `[REDACTED]` inline |
| Absolute home paths (`/Users/...`, `/home/...`) | Replaced with `~` |
| Prompt injection signatures | Entire `metadata` block cleared and replaced with redaction notice |
| Metadata exceeds size limit | Metadata block replaced with size-exceeded notice |
| Graph nodes exceed limit | Graph nodes truncated to `MAX_GRAPH_NODES` |
| Total context exceeds serialization limit | Fields dropped in priority order: graph details → quality → constraints → metadata |

---

## `validateContext(context)`

Validates a sanitized context object against `context.schema.json`.

### validateContext(context) Signature

```ts
validateContext(context: SanitizedContext): ValidationResult
```

### validateContext(context) Return Value

Same as `check()`: `{ valid: boolean, errors: AjvError[] | null }`

---

## `serializeContext(context, format)`

Serializes a sanitized context to the requested output format.

### serializeContext(context, format) Signature

```ts
serializeContext(context: SanitizedContext, format: "json" | "markdown"): string
```

### serializeContext(context, format) Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `context` | `SanitizedContext` | Yes | A validated, sanitized context object. |
| `format` | `string` | Yes | `"json"` or `"markdown"` |

### serializeContext(context, format) Return Value

- `"json"`: Deterministic JSON string with sorted keys, 2-space indent, LF endings.
- `"markdown"`: Human-readable Markdown document.

### serializeContext(context, format) Errors

| Condition | Error |
|-----------|-------|
| Unknown format | Throws `Error: Unknown format: <format>` |

---

## `loadContext(filepath)`

Loads a previously serialized `context.json` from disk.

### loadContext(filepath) Signature

```ts
loadContext(filepath: string): SanitizedContext
```

### loadContext(filepath) Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `filepath` | `string` | Yes | Path to `context.json`. |

### loadContext(filepath) Errors

| Condition | Behavior |
|-----------|----------|
| File not found | Propagates `ENOENT` error |
| Invalid JSON | Propagates `SyntaxError` |

---

## Compatibility Guarantee

- All v0.1.x SDK methods (`parse`, `check`) remain unchanged in v0.2.x.
- Graph, lint, context methods were added in v0.2.0 and are now frozen.
- The `lint` sub-module export shape is stable.
- No internal modules are importable through the `exports` field — only the root `.` export is public.
