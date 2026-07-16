# OWIS Ecosystem

## Vision

OWIS (Open Workspace Intelligence Specification) is the lingua franca that connects **developers**, **AI agents**, **CI/CD pipelines**, **IDE extensions**, and **documentation generators**. It provides a deterministic, versioned representation of a codebase (WIR, context JSON/Markdown) that any consumer can ingest without parsing source files.

## Principles

- **Interoperability** – All public artifacts are defined as open JSON schemas.
- **Determinism** – Given the same input repository, the runtime produces identical `wir.json` and `context.json`.
- **Extensibility** – Extension points are explicit and versioned.
- **Governance** – Evolution of the specification follows RFC processes and is documented in the `governance/` folder.
- **Stability** – Public APIs are classified in the **Public API Stability Matrix** (see `IMPLEMENTATION_PLAN_PHASE17.md`).

## Ecosystem Layers

1. **Specification** – Formal definition of WIR, context formats, and schema contracts.
2. **Reference Runtime** – The canonical implementation (`@prodakwah/owis-runtime`).
3. **SDK** – Language bindings (Node, Python, etc.) that wrap the runtime.
4. **Developer Tools** – CLI, lint, graph visualizer.
5. **Integrations** – IDE extensions, CI actions, AI adapters.
6. **Templates** – Starter repositories for common use‑cases.
7. **Registry** – Future package registry for OWIS‑compatible tooling.
8. **Certification** – Conformance test suites and badge program.
9. **Community** – Contributions, discussions, and governance.

## Stakeholders

| Stakeholder | Needs |
|------------|-------|
| Individual Developers | CLI, SDK, examples, quick‑start guides |
| Teams | CI validation, documentation, governance |
| Enterprises | Governance framework, version policy, compatibility guarantees |
| AI IDE Vendors | Stable API, MCP spec, language server, SDK |
| OSS Maintainers | Templates, migration guide, examples |

## Consumer Matrix

| Consumer | Uses |
|----------|------|
| CLI | Runtime |
| SDK | Runtime |
| IDE | SDK |
| MCP | Runtime |
| CI | CLI |
| VSCode | SDK |
| AI Agent | Context |
| GitHub Action | CLI |
| Documentation | Context |

## Producer Matrix

| Producer | Produces |
|----------|----------|
| Runtime | WIR, Context JSON |
| Graph Engine | Graph JSON |
| Context Engine | Context Markdown |
| Lint Engine | Diagnostics |
| SDK | Language‑specific API |
| CLI | Reports, exit codes |

## Extension Model

- **Rule Providers** – Custom lint/validation rules.
- **Schema Providers** – Additional JSON schema contributions.
- **Exporters / Importers** – Alternate serializations (YAML, protobuf).
- **Graph Analyzer** – Plugins for custom graph queries.
- **Context Adapters** – Bridge to LLMs, code‑search engines.
- **Renderers** – HTML, Markdown, JSON visualizers.
- **Plugin Loader** – Runtime‑agnostic discovery of extensions.

## Compatibility Philosophy

- **Stable** APIs guarantee backward compatibility across major releases.
- **Supported** APIs may evolve but maintain semantic compatibility; deprecation warnings are emitted.
- **Experimental** APIs are usable but can change without notice.
- **Internal** APIs are not part of the public contract.

## Plugin Philosophy

Plugins are discovered via a **manifest** (`owis-plugin.json`) placed at the repository root. They declare required capabilities, version ranges, and optional dependencies. The runtime loads plugins in a sandboxed environment to avoid side‑effects.

## Governance Relationship

The ecosystem documentation lives under `docs/`. Governance processes (RFC, ADR) are defined in `docs/governance/`. All ecosystem artifacts must be reviewed via the OWIS RFC workflow before being marked **Stable**.

## Ecosystem Lifecycle

1. **Design** – RFC → ADR → Specification freeze.
2. **Implementation** – Reference runtime, SDKs, and tooling.
3. **Adoption** – Templates, examples, integration guides.
4. **Stabilization** – Public API freeze, certification.
5. **Evolution** – New phases (Registry, Certification) built on a stable base.
