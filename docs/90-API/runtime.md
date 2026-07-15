# OWIS Runtime API Contract

**Package:** `owis-runtime`  
**Version:** 0.2.0  
**Status:** FROZEN (v0.2.0-rc.1)

## Overview

The OWIS Reference Runtime is the canonical implementation that parses a workspace directory, validates it, and generates a Workspace Intelligence Report (WIR). It is used internally by the CLI and SDK.

## Installation

```
npm install owis-runtime
```

## Exports

```js
const { parseWorkspace } = require('owis-runtime');
const { validate } = require('owis-runtime/src/validator');
```

Entry point: `src/index.js`

---

## `parseWorkspace(workspacePath)`

Scans a local workspace directory and produces a complete Workspace Intelligence Report (WIR) object.

### Signature

```ts
parseWorkspace(workspacePath: string): WIR
```

### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `workspacePath` | `string` | Yes | Absolute or relative path to the workspace root directory. Resolved to absolute internally. |

### Return Value

Returns a `WIR` object conforming to `docs/20-SCHEMA/wir.schema.json`.

```ts
interface WIR {
  workspace: {
    root: string;
    scanned_files: number;
    scanned_directories: number;
    ignored_paths: string[];
    supported_formats: string[];
    generated_at: string; // ISO 8601
  };
  project: {
    name: string;
    description: string;
    version: string;
    maturity: string;
    repository_type: string;
    domain: string;
    objectives: string[];
    stakeholders: string[];
  };
  source_of_truth: {
    primary: string[];
    secondary: string[];
    reference: string[];
    temporary: string[];
  };
  knowledge: {
    glossary: Record<string, string>;
    terminology: Record<string, string>;
    concepts: string[];
    business_rules: string[];
    assumptions: string[];
  };
  architecture: {
    style: string;
    patterns: string[];
    bounded_contexts: string[];
    modules: Array<{ path: string; size: number }>;
    services: string[];
    packages: string[];
    layers: string[];
    workflows: string[];
  };
  technology: {
    languages: string[];
    frameworks: string[];
    runtimes: string[];
    libraries: string[];
    package_managers: string[];
  };
  contracts: {
    api: string[];
    schema: string[];
    interfaces: string[];
  };
  dependencies: {
    internal: string[];
    external: string[];
  };
  confidence: {
    workspace: number;
    architecture: number;
    contracts: number;
    overall: number;
  };
  execution: {
    readiness: "READY" | "BLOCKED" | "PARTIAL";
    blockers: string[];
    recommended_scope: string[];
    validation_required: string[];
    next_action: string | null;
  };
}
```

### Errors

| Condition | Error Message |
|-----------|---------------|
| Path does not exist | `Workspace path does not exist: <path>` |
| Path is not a directory | `Not a directory: <path>` |
| JSON parse failure in `workspace.json` | Propagates `SyntaxError` with file path context |

### Side Effects

None. `parseWorkspace` is a pure read-only operation. It does not write files to disk.

### Example

```js
const { parseWorkspace } = require('owis-runtime');

const wir = parseWorkspace('./my-project');
console.log(wir.project.name);    // e.g. "my-project"
console.log(wir.workspace.scanned_files); // e.g. 42
```

---

## `validate(schemaName, data)`

Validates a data payload against a named OWIS JSON schema.

### Signature

```ts
validate(schemaName: string, data: object): ValidationResult
```

### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `schemaName` | `string` | Yes | One of: `"wir"`, `"workspace"`, `"uars"`, `"artifact"`, `"dependency"`, `"knowledge"` |
| `data` | `object` | Yes | The JSON payload to validate. |

### Return Value

```ts
interface ValidationResult {
  valid: boolean;
  errors: Array<{
    instancePath: string;
    schemaPath: string;
    keyword: string;
    message: string;
  }> | null;
}
```

### Errors

| Condition | Behavior |
|-----------|----------|
| Unknown `schemaName` | Returns `{ valid: false, errors: [{ message: "Unknown schema: <name>" }] }` |
| `data` is not an object | Returns `{ valid: false, errors: [{ message: "Input is not a valid object" }] }` |

### Example

```js
const { validate } = require('owis-runtime/src/validator');

const result = validate('wir', wirObject);
if (!result.valid) {
  console.error(result.errors);
}
```

---

## Compatibility Guarantee

- `parseWorkspace` return shape is stable for all v0.2.x releases.
- WIR objects produced by v0.1.x `parseWorkspace` remain valid inputs to all v0.2 consumers (graph, context, lint).
- The `validate` function's `ValidationResult` shape is stable.
- New schema versions may be added; existing schema names remain backward compatible.

## Artifact Determinism

`parseWorkspace` produces non-deterministic timestamps in `workspace.generated_at`.
Consumers that require full determinism (e.g., snapshot tests) MUST normalize this field before comparison.
All other fields are deterministic given identical filesystem contents.
