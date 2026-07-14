# Mock Test Workspace

This workspace is a reference implementation environment designed to test the OWIS parsing, schema validation, and reporting pipelines.

---

## Workspace Representation

The workspace is a standard codebase layout containing:
- `workspace.json`: Configuration mapping the project name, excluding patterns, and settings.
- `artifacts/`: Mock documentation files serving as primary Sources of Truth.
- `README.md`: High-level information guide.

---

## Workspace Ingestion Rules

1. **Discovery**: The reference parser scans this directory recursively, bypassing folders like `.git`, `node_modules`, and custom excludes specified in `workspace.json`.
2. **Metadata Classification**: Detects package and language stack formats (like JavaScript/TypeScript files, Markdown files, and `package.json` configurations).
3. **Hierarchy Mapping**: Identifies the primary and secondary Source of Truth tiers.

---

## Validation Flow

When you run the OWIS verification suite, the following validation events occur:
- The configuration `workspace.json` is validated against `workspace.schema.json`.
- The parser compiles all discovered artifacts into the Workspace Intelligence Report (WIR).
- The resulting WIR payload is validated against `wir.schema.json`.
- The validated output is saved as `wir.json` at the root of the workspace.
