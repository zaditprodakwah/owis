# Changelog

All notable changes to the OWIS specification will be documented in this file.

## v0.2.0-beta.1

**Status**: Implemented
**Focus**: RFC-002 LLM Context Layer

Added:
- Standalone `@prodakwah/owis-context` package for provider-neutral LLM context generation
- Builder for composing context from workspace, WIR, graph, and lint reports
- Strict Sanitizer pipeline (Secret Redaction, Path Filtering, Prompt Injection Detection, Budget Enforcement)
- JSON and Markdown serialization adapters
- Additive CLI command `owis context <workspace>`
- Added Context APIs to SDK (`buildContext`, `sanitizeContext`, `validateContext`, `serializeContext`)



**Status**: Implemented
**Focus**: RFC-001 WIR Graph Engine

Added:
- Standalone `@prodakwah/owis-graph` package for generating workspace intelligence graphs
- CLI integration to output `wir.graph.json` during workspace scan
- Graph extractor with mandatory security limits (max nodes, max edges, max depth, etc.)
- Graph analyzer for connected components, circular dependencies, and orphan nodes
- SDK methods `parseGraph()`, `analyzeGraph()`, `serializeGraph()`

## v0.2.0-alpha.1

**Status**: Implemented
**Focus**: OWIS Schema Linter

Added:
- RFC-003 Schema Linter standalone engine (`@prodakwah/owis-lint`)
- `owis lint` CLI command with unified diagnostics reporting
- Linter Rule Registry and Scorer models
- OWIS001: Missing workspace metadata validation
- OWIS002: Invalid schema reference validation
- OWIS003: Undocumented component validation
- OWIS004: Missing dependency relationships validation
- OWIS005: Naming convention validation

## v0.1.0
**Distribution**: GitHub Release, NPM (`@prodakwah/owis`, `@prodakwah/owis-sdk`)

Added:
- External Adoption Testing framework and mock workspaces
- Agent Compatibility Testing specification
- CLI UX enhancements and robustness fixes for malformed workspaces
- SDK Integration Example
- GitHub Issue and PR templates for community readiness
- Documentation portal hardening
- Canonical navigation hierarchy
- SEO metadata
- Sitemap generation
- Documentation governance baseline
- Initial Draft Canonical of Open Workspace Intelligence Specification
- Universal Agent Runtime Specification (UARS)
- Workspace Intelligence Report (WIR)

Changed:
- CLI output format to be structured and user-friendly
- README documentation flow
- Roadmap milestone structure

Fixed:
- Broken documentation links
- Portal navigation inconsistencies
