# API Stability Policy

OWIS prioritizes strict backward compatibility and deterministic execution. Ecosystem tools relying on the OWIS Specification and SDK expect structural and behavioral guarantees.

## What is Guaranteed?
- **Schema Contracts**: Once a property is defined in a stable JSON schema release (e.g., `workspace.schema.json`), its type and fundamental constraints will not change or be removed until the next Major version.
- **Exported Functions**: Public SDK functions (e.g., `parseWorkspace`, `analyzeGraph`) will retain their signatures. Additive options may be introduced, but existing valid calls will not throw new structural errors.
- **Artifact Determinism**: Given the same inputs, the generated `wir.json` and `context.md` files will remain structurally deterministic across minor and patch versions.

## What is NOT Guaranteed?
- **Internal Modules**: Any module imported from a `src/` or `internal/` path rather than the root package export is subject to change without notice.
- **Error Messages**: While error *codes* and the fact that an error is thrown remain stable, the human-readable text of an error message may change for clarity. Do not parse error text for control flow.
- **Performance Characteristics**: While we strive for extreme performance, precise execution times and memory peak values are not contractually guaranteed and may fluctuate based on underlying dependency changes.
