# OWIS Lint API Contract

**Package:** `@prodakwah/owis-lint`  
**Version:** 0.2.0  
**Status:** FROZEN (v0.2.0-rc.1)

## Overview

The OWIS Lint package provides a rule-based architecture linting engine that validates a WIR for structural, naming, dependency, and metadata issues.

## Installation

```
npm install @prodakwah/owis-lint
```

## Exports

```js
const { engine, registry, formatter, Diagnostic, loadDefaultRules } = require('@prodakwah/owis-lint');
```

Entry point: `index.js`

---

## `loadDefaultRules()`

Registers all built-in lint rules. Must be called before running `engine.lint()` unless you register rules manually via `registry`.

### loadDefaultRules() Signature

```ts
loadDefaultRules(): void
```

### Side Effects

Registers all rules from `rules/index.js` into the shared `registry`.

### loadDefaultRules() Example

```js
const { loadDefaultRules, engine } = require('@prodakwah/owis-lint');
loadDefaultRules();
const result = engine.lint({}, wir);
```

---

## `engine`

The lint engine singleton.

### `engine.lint(context, wir)`

Runs all registered rules against the provided WIR.

#### engine.lint(context, wir) Signature

```ts
engine.lint(context: object, wir: WIR): LintResult
```

#### engine.lint(context, wir) Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `context` | `object` | Yes | Execution context (currently unused; pass `{}`). Reserved for future rule configuration. |
| `wir` | `WIR` | Yes | A parsed WIR object. |

#### engine.lint(context, wir) Return Value

```ts
interface LintResult {
  diagnostics: Diagnostic[];
  score: number;         // 0–100
  summary: {
    errors: number;
    warnings: number;
    info: number;
    total: number;
  };
}
```

---

## `Diagnostic`

The diagnostic type class.

### Properties

```ts
class Diagnostic {
  id: string;
  severity: "ERROR" | "WARNING" | "INFO";
  message: string;
  path: string;       // JSON path of the violating field, e.g. "project.name"
  rule: string;       // Rule ID that produced this diagnostic
}
```

---

## `registry`

The rule registry singleton.

### `registry.register(rule)`

Registers a custom lint rule.

#### registry.register(rule) Signature

```ts
registry.register(rule: LintRule): void
```

#### `LintRule` Shape

```ts
interface LintRule {
  id: string;
  description: string;
  severity: "ERROR" | "WARNING" | "INFO";
  check(context: object, wir: WIR): Diagnostic[];
}
```

---

## `formatter`

### `formatter.formatCLI(result, workspacePath)`

Formats a `LintResult` as a human-readable CLI string.

#### formatter.formatCLI(result, workspacePath) Signature

```ts
formatter.formatCLI(result: LintResult, workspacePath: string): string
```

#### formatter.formatCLI(result, workspacePath) Return Value

Multi-line string with ANSI-compatible structure:
- Header with workspace path
- Each diagnostic on its own line with severity, rule ID, and message
- Score summary footer

---

## Built-in Rules

| Rule ID | Severity | Description |
|---------|----------|-------------|
| `schema/required-fields` | ERROR | Checks that all required WIR top-level fields are present. |
| `metadata/project-name` | WARNING | Checks that `project.name` is not empty or auto-generated. |
| `metadata/version-format` | WARNING | Checks that `project.version` follows semver format. |
| `naming/no-absolute-paths` | ERROR | Checks that no module path is an absolute filesystem path. |
| `dependency/no-circular` | ERROR | Checks that internal dependency graph has no cycles. |
| `dependency/declared` | WARNING | Checks that all referenced packages appear in `dependencies`. |

---

## Compatibility Guarantee

- `engine.lint()` input/output shape is frozen.
- `Diagnostic` property names are frozen.
- `registry.register()` and `formatter.formatCLI()` signatures are frozen.
- New built-in rules may be added in minor releases.
- Existing built-in rule IDs and severities will not change.
- `loadDefaultRules()` continues to load all built-in rules in future releases.
