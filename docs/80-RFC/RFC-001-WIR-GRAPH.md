# RFC-001: WIR Graph Intelligence

## Status

Draft


## Problem Statement

Currently, the Workspace Intelligence Report (WIR) is primarily a metadata report containing flat lists of detected languages, artifacts, and frameworks. It lacks structural mapping of the relationships between files and components, which limits the ability of AI agents to reason about the deep architecture or follow execution flows.

## Motivation

To upgrade WIR from a flat metadata structure into a true workspace intelligence graph. This allows agents to understand module relationships, import analysis, package relationships, and architecture visualization, greatly improving context-aware code generation.

## Proposed Solution

Target architecture:
```
Workspace
    |
    ↓
Parser
    |
    ↓
Dependency Graph
    |
    ↓
WIR Graph Model
```

- Introduce a graph modeling schema in the WIR output.
- Traverse file imports and dependency relationships during the parsing phase.
- Map intra-workspace module relationships alongside external package relationships.

## Architecture Impact

- The `owis-runtime` parser will need an Abstract Syntax Tree (AST) or static analysis layer to detect imports across supported languages (e.g., JS/TS `import`/`require`, Python `import`, Go `import`).
- The `wir.schema.json` will need to be expanded to include a `graph` or `nodes/edges` representation.

## Backward Compatibility

- The graph model must be additive. Existing flat metadata fields (`artifacts`, `frameworks`) must remain unchanged to preserve v0.1.0 compatibility.
- Existing tools consuming WIR v0.1.0 will simply ignore the new `graph` object.

## Security Considerations

- Static analysis of large files could lead to ReDoS (Regular Expression Denial of Service) or out-of-memory (OOM) errors. Rate limiting, max depth, or max file size rules must be enforced during graph traversal.
- Ensure no runtime execution of files during static analysis.

## Implementation Plan

Do not implement yet.
Only define:
* schema changes
* graph model
* compatibility strategy

## Open Questions

- What is the most standard JSON format for representing the graph (e.g., directed acyclic graph formats)?
- Should the dependency graph cover external network dependencies or just local file relationships?
