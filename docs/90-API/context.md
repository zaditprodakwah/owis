# OWIS Context API Contract

**Package:** `@prodakwah/owis-context`  
**Version:** 0.2.0  
**Status:** FROZEN (v0.2.0-rc.1)

## Overview

The OWIS Context package assembles, sanitizes, validates, and serializes a provider-neutral LLM context payload from any combination of OWIS workspace artifacts.

## Installation

```
npm install @prodakwah/owis-context
```

## Exports

```js
const { buildContext, sanitizeContext, validateContext, serializeContext, loadContext } = require('@prodakwah/owis-context');
```

Entry point: `index.js`

---

## `buildContext(payloads, sourcesMap)`

Assembles a raw context object from available OWIS artifacts.

### buildContext(payloads, sourcesMap) Signature

```ts
buildContext(
  payloads: ContextPayloads,
  sourcesMap: SourcesMap
): RawContext
```

### buildContext(payloads, sourcesMap) Parameters

```ts
interface ContextPayloads {
  workspace?: WorkspaceJSON;
  wir?: WIR;
  graph?: SerializedGraph;
  lint?: LintResult;
}

type SourcesMap = Record<"workspace" | "wir" | "graph" | "lint", string>;
```

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payloads` | `ContextPayloads` | Yes | One or more OWIS artifacts. All keys are optional but at least one should be present. |
| `sourcesMap` | `SourcesMap` | Yes | Maps artifact type to filename. Used to populate `context.sources`. |

### buildContext(payloads, sourcesMap) Return Value

A `RawContext` object. This is **not validated or sanitized**. You MUST pass it through `sanitizeContext` and `validateContext` before use or serialization.

### Context Version

All contexts produced by v0.2.x have `contextVersion: "0.2.0"`.

### buildContext(payloads, sourcesMap) Example

```js
const { buildContext } = require('@prodakwah/owis-context');

const context = buildContext(
  { wir, graph },
  { wir: 'wir.json', graph: 'wir.graph.json' }
);
```

---

## `sanitizeContext(context)`

Applies the sanitization pipeline to a raw context object.

### sanitizeContext(context) Signature

```ts
sanitizeContext(context: RawContext): SanitizeResult
```

### sanitizeContext(context) Return Value

```ts
interface SanitizeResult {
  context: SanitizedContext;
  diagnostics: SanitizeDiagnostic[];
}

interface SanitizeDiagnostic {
  stage: string;
  message: string;
}
```

The `context` object returned has `_truncated: boolean` set to `true` if any budget limits were enforced.

### Sanitization Pipeline (in order)

1. **Secret Redaction** — Inline-replaces detected secrets with `[REDACTED]`.
2. **Path Filtering** — Replaces absolute home directory paths with `~`.
3. **Prompt Injection Detection** — Clears `metadata` if injection signatures are detected.
4. **Budget Enforcement** — Enforces node count, metadata size, and total serialization size limits.

### Budget Limits

| Limit | Default Value |
|-------|---------------|
| `MAX_GRAPH_NODES` | Defined in `context/limits.js` |
| `MAX_METADATA_SIZE_BYTES` | Defined in `context/limits.js` |
| `MAX_SERIALIZED_CONTEXT_SIZE_BYTES` | Defined in `context/limits.js` |

These limits are internal constants. They are not part of the public API and may change between minor releases to tune performance. Only the sanitization **behavior** (what gets truncated/redacted) is frozen.

### Security Contract

This function MUST NOT:

- Panic or throw on malformed inputs
- Block indefinitely on any input
- Allow prompt injection to pass through to `metadata`
- Leak secrets or absolute paths into serialized output

### sanitizeContext(context) Example

```js
const { sanitizeContext } = require('@prodakwah/owis-context');

const { context, diagnostics } = sanitizeContext(rawContext);
if (context._truncated) {
  console.warn('Context was truncated. Diagnostics:', diagnostics);
}
```

---

## `validateContext(context)`

Validates a sanitized context against `context/schema.json`.

### validateContext(context) Signature

```ts
validateContext(context: SanitizedContext): ValidationResult
```

### validateContext(context) Return Value

```ts
interface ValidationResult {
  valid: boolean;
  errors: AjvError[] | null;
}
```

### validateContext(context) Example

```js
const { validateContext } = require('@prodakwah/owis-context');

const result = validateContext(context);
if (!result.valid) {
  console.error('Context is invalid:', result.errors);
  process.exit(1);
}
```

---

## `serializeContext(context, format)`

Serializes a validated context to a string in the requested format.

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

- `"json"`: UTF-8 JSON string with 2-space indentation, LF line endings, sorted keys.
- `"markdown"`: UTF-8 Markdown document with LF line endings.

### Determinism

Both output formats are fully deterministic:
- Same input → identical byte-for-byte output (excluding `generatedAt` timestamps).
- Consumers that need full determinism MUST normalize `generatedAt` before comparison.

### serializeContext(context, format) Errors

| Condition | Error |
|-----------|-------|
| Unknown format string | Throws `Error: Unknown format: <format>` |

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
| `filepath` | `string` | Yes | Absolute or relative path to a `context.json` file. |

### loadContext(filepath) Errors

| Condition | Behavior |
|-----------|----------|
| File not found | Propagates `ENOENT` system error |
| Invalid JSON | Propagates `SyntaxError` |

---

## Adapters

The following adapters are available at `context/adapters/` but are not exported through the main package entry point. They are internal implementation details and **not part of the public API**.

| Adapter | File |
|---------|------|
| JSON | `adapters/json.js` |
| Markdown | `adapters/markdown.js` |
| OpenAI | `adapters/openai.js` |
| Anthropic | `adapters/anthropic.js` |
| LangChain | `adapters/langchain.js` |
| AutoGen | `adapters/autogen.js` |
| CrewAI | `adapters/crewai.js` |
| Generic | `adapters/generic.js` |

If you need to use a specific adapter directly, require it with `require('@prodakwah/owis-context/adapters/<name>')`. These paths are not covered by the compatibility guarantee and may change in minor releases.

---

## Compatibility Guarantee

- `buildContext`, `sanitizeContext`, `validateContext`, `serializeContext`, `loadContext` signatures are frozen.
- `SanitizeResult.diagnostics` shape (stage + message) is frozen.
- `_truncated` flag behavior is frozen.
- `contextVersion: "0.2.0"` is emitted by all v0.2.x builds.
- Sanitization pipeline order (secrets → paths → injection → budget) is frozen.
- JSON output format (sorted keys, 2-space indent, LF) is frozen.
- Budget limit constants are implementation details, not part of the API.
