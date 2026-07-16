# OWIS Integration Matrix

This document maps all planned and active integrations for the OWIS ecosystem, detailing their architecture, data flow, dependencies, and risks.

---

## Development & Editor Integrations

| Integration | Status | Priority | Complexity |
|-------------|----------|-----------|------------|
| **VS Code** | Planned | High | Medium |
| **Cursor** | Planned | High | Low |
| **Windsurf** | Planned | High | Low |
| **Claude Code** | Planned | High | Low |
| **Codex** | Planned | High | Low |

### VS Code
- **Purpose:** Native IDE support for OWIS, offering graph previews, semantic outline, real-time diagnostics, and contextual code actions.
- **Architecture:** Node-based Language Server Protocol (LSP) wrapping `@prodakwah/owis-runtime`.
- **Data Flow:** Editor events trigger incremental WIR recalculation. Exposes hover and quick-fix commands.
- **Dependencies:** `@prodakwah/owis-runtime`, `vscode-languageclient`.
- **Risks/Limitations:** Performance constraints in large monorepos. Requires a strict performance budget (under 150ms per keystroke).
- **Future Compatibility:** Ready for LSP 3.17+ and adaptable for Eclipse Theia.

### Cursor, Windsurf, Claude Code, Codex
- **Purpose:** Empower AI-assisted editors with deterministic, whole-workspace context to dramatically improve code generation accuracy.
- **Architecture:** Local integration via CLI (`owis context`) or MCP (Model Context Protocol).
- **Data Flow:** Editor requests workspace context; OWIS provides targeted markdown or JSON subsets of the WIR.
- **Dependencies:** `@prodakwah/owis-cli`, `@prodakwah/owis-context`.
- **Risks/Limitations:** Some editors restrict the size of injectible context window.
- **Future Compatibility:** Agnostic to the underlying LLM; relies solely on OWIS output stability.

---

## AI Platforms & Frameworks

| Integration | Status | Priority | Complexity |
|-------------|----------|-----------|------------|
| **MCP** | Planned | Very High | High |
| **OpenAI** | Planned | High | Medium |
| **Anthropic** | Planned | High | Medium |
| **Gemini** | Planned | High | Medium |
| **OpenRouter** | Planned | Medium | Low |
| **Ollama** | Planned | Medium | Low |
| **LangChain** | Planned | Medium | Medium |
| **LlamaIndex** | Planned | Medium | Medium |

### MCP (Model Context Protocol)
- **Purpose:** Serve as a standardized, streaming context provider for any compliant MCP client.
- **Architecture:** Fastify/Express server exposing MCP-compliant JSON-RPC endpoints.
- **Data Flow:** AI clients query resources (files, modules, dependency subgraphs); OWIS streams back resolved artifacts.
- **Dependencies:** `@prodakwah/owis-runtime`, `@modelcontextprotocol/sdk`.
- **Risks/Limitations:** Complex authentication, authorization, and rate-limiting models.

### LLM Providers (OpenAI, Anthropic, Gemini, OpenRouter)
- **Purpose:** Direct integrations or prompt wrappers that format OWIS output optimally for specific model families (e.g., Gemini's large context window vs. OpenAI's strict token limits).

### Orchestration (LangChain, LlamaIndex)
- **Purpose:** Tools for building complex RAG pipelines using the deterministic OWIS graph as a primary indexing source.
- **Architecture:** Custom `DocumentLoader` and `NodeParser` implementations.
- **Dependencies:** Python/TS versions of LangChain.

---

## CI/CD Platforms

| Integration | Status | Priority | Complexity |
|-------------|----------|-----------|------------|
| **GitHub Actions** | Planned | High | Low |
| **GitLab** | Planned | Medium | Low |
| **Jenkins** | Planned | Low | Low |
| **Azure DevOps** | Planned | Low | Low |

### GitHub Actions
- **Purpose:** Enforce OWIS constraints (linting), generate WIR diffs on pull requests, and output context artifacts for downstream agents.
- **Architecture:** Docker-based or Node-based composite action wrapping `owis lint` and `owis build`.
- **Data Flow:** Workflow triggers on `push` or `pull_request`, outputs Sarif reports or posts PR comments.
- **Dependencies:** `actions/checkout`, `@prodakwah/owis-cli`.
- **Risks:** Rate limiting on GitHub API for PR comments.

---

## Containers & Infrastructure

| Integration | Status | Priority | Complexity |
|-------------|----------|-----------|------------|
| **Docker** | Planned | Medium | Low |
| **Kubernetes** | Planned | Low | High |
| **Dev Containers** | Planned | High | Low |

### Docker & Dev Containers
- **Purpose:** Provide a zero-install, ready-to-run environment for evaluating and integrating OWIS.
- **Architecture:** Alpine-based Node container with global `@prodakwah/owis` CLI installed.
- **Data Flow:** Mounts host volume `/workspace` and runs analysis.

---

## Documentation Generators

| Integration | Status | Priority | Complexity |
|-------------|----------|-----------|------------|
| **VitePress** | Active | High | Low |
| **Docusaurus** | Planned | Medium | Low |
| **MkDocs** | Planned | Low | Low |

### VitePress
- **Purpose:** The current documentation portal engine.
- **Architecture:** Native Vite plugin integrations to dynamically generate pages based on OWIS graph (e.g., API reference generation).
