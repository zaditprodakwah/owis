# OWIS v0.2.0 Release Candidate 1

We are thrilled to announce the first Release Candidate for OWIS v0.2.0! This release marks the completion of Phase 15 and finalizes the core architectural specifications and runtime engine for the Open Workspace Intelligence Specification.

## Highlights
- **Stable Specification & Runtime**: The v0.2.0 specification is now frozen, ensuring a deterministic and backward-compatible foundation.
- **WIR Graph Extraction**: First-class support for Workspace Intelligence Record (WIR) graph extraction, dependency mapping, and cycle detection.
- **Provider-Neutral Context Layer**: Introducing the extensible context builder with JSON and Markdown adapters.
- **Deterministic Artifacts**: Execution is fully deterministic, byte-identical, and protected against zip bombs, deep recursion, and prompt injection attacks.
- **100% Zero-Trust Audit PASS**: Certified with a 100/100 score on our stringent release verification matrix.

## Architecture
- **Additive WIR Graph**: Extracts node limits and enforces depth/memory limits transparently.
- **Standalone Packages**: Segregated into `@prodakwah/owis-runtime`, `sdk`, `cli`, `lint`, `graph`, and `context`.

## Compatibility & Migration
- Fully backward-compatible with legacy `v0.1` fixtures and contexts.
- No breaking changes for runtime behaviors or SDK usage. See `ADOPTION.md` (upcoming in Phase 16) for migration guides.

## Known Issues
- Minor duplicate headings present in `docs/90-API/` (to be addressed during the Phase 16 Documentation Freeze).
- Transitive NPM audit warnings in dev-tooling (to be cleared before stable 1.0).

## Security & Performance
- Passed 16/16 fuzz tests (Symlink recursion, path traversal, payload filtering).
- Core parsing operates entirely under 15ms across test graphs with peak memory < 10 MB.

_Thank you to all contributors who have made v0.2.0 possible!_
