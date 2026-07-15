# OWIS Ecosystem

OWIS (Open Workspace Intelligence Specification) is designed to be the foundational layer for tools that reason about codebases. Because it emits deterministic JSON artifacts (`wir.json` and `context.json`), it acts as a neutral bridge between your raw source code and intelligent tooling.

This document serves as an index for the broader OWIS ecosystem.

## Integrations

### AI Agents and LLM Frameworks
OWIS is an ideal context-provider for Large Language Models. By passing the output of `@prodakwah/owis-context` (or running `owis context`) to your prompt, you drastically reduce token overhead while providing the model with a perfect architectural map of the workspace.
- [Integrating with AI Agents](docs/ecosystem/AI_AGENTS.md)

### Editor Extensions
The OWIS deterministic artifact generation can power real-time IDE features like intelligent dependency graphs, cross-module refactoring context, and deep code understanding.
- [VSCode Extension Plan](docs/ecosystem/VSCODE_EXTENSION_PLAN.md)

### CI/CD Pipelines
OWIS can be used in CI/CD to:
- Generate cryptographically verifiable hashes of the workspace architecture (e.g., `sha256sum wir.json`).
- Prevent circular dependencies via `@prodakwah/owis-lint`.
- Gate PRs based on architectural constraints defined in `workspace.json`.

### Static Analysis Tools
Because OWIS handles the complex resolution of monorepo package structures and file paths, downstream static analysis tools can simply consume `wir.json` to know exactly what modules exist, what they export, and what they import, without parsing the filesystem themselves.
