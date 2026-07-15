# Changelog

All notable changes to the Open Workspace Intelligence Specification (OWIS) and its official reference implementation will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [v0.2.0-rc.1] - 2026-07-15

### Added
- **Core Specification**: Finalized Phase 15 Core Specification implementation.
- **WIR Engine**: Pure additive Directed Acyclic Graph extraction in `@prodakwah/owis-graph`.
- **Runtime Limits**: Max search depth (10) and Node limit (500) enforced to prevent OOM errors on massive repos.
- **Context Adapters**: Provider-neutral export capability (Markdown, JSON, OpenAI, Anthropic, LangChain) via `@prodakwah/owis-context`.
- **CLI Commands**: Fully functional CLI including `owis scan`, `owis validate`, `owis lint`, and `owis context`.
- **Security Checkers**: Added path traversal blockers, symlink loop detection, and aggressive JSON sanitization.
- **Quality Gates**: Over 100 passing Unit tests, integration pipelines, benchmark suites, and exhaustive CI validation flows.
- **Fuzzing Infrastructure**: Automated property-based fuzz testing to ensure catastrophic failure resilience.
- **Documentation Site**: Complete VitePress integration mapping to `https://zaditprodakwah.github.io/owis/`.
- **GitHub Governance**: Fully populated GitHub issue templates, PR templates, and community governance documentation.

### Changed
- Refactored all independent domains into standalone packages (`runtime`, `sdk`, `cli`, `lint`, `graph`, `context`) for isolated usage.
- Migrated default logging to JSON-structured verbose formatting for machine readability.
- Re-architected schema validation to enforce exact structure via Ajv strictly.

### Fixed
- Addressed multiple Edge Case vulnerabilities (Infinite symlinks, oversized metadata, corrupted Unicode characters).
- Fixed transitive `npm audit` warnings related to development dependencies by deduplicating package-lock chains.
- Prevented Graph Engine recursive hangs during extraction of circular imports.

### Security
- Comprehensive Zero-Trust validation methodology applied to all runtime operations.
- Enforced strict input sanitization on all raw user workspace files before inclusion in the WIR layer.
