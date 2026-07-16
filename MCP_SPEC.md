# Model Context Protocol (MCP) Design Specification

*Status: Design Only. No implementation in Phase 17.*

## Overview

The OWIS MCP Server bridges the deterministic Workspace Intelligence Representation (WIR) and LLM clients utilizing the standard Model Context Protocol. By exposing the workspace graph over MCP, AI assistants (like Claude, Cursor, or custom agents) can dynamically explore repository architecture without needing the entire codebase in their initial context window.

---

## Resources

The MCP server will expose the following REST-like resource URIs:

- `owis://workspace/wir` - The raw, complete JSON representation of the WIR graph.
- `owis://workspace/context/markdown` - A highly condensed, token-optimized text summary of the architecture.
- `owis://modules/{module_id}` - Metadata, exports, and imports for a specific module.
- `owis://packages/{package_id}` - Dependency definitions for a specific monorepo package.
- `owis://diagnostics/lint` - Current architectural violations identified by `@prodakwah/owis-lint`.

## Tools

The MCP server will expose the following callable tools for the LLM:

- `get_module_dependencies(moduleId)` - Returns an array of modules that the requested module depends on.
- `get_module_dependents(moduleId)` - Returns an array of modules that depend on the requested module.
- `find_circular_dependencies()` - Triggers a cycle-detection algorithm on the graph and returns the loops.
- `resolve_import_path(source, target)` - Validates if an import from `source` to `target` is legally permitted by OWIS rules.

## Prompts

Pre-configured prompt templates exposed to the MCP client:

- `architectural_review` - Injects the full context markdown and asks the model to review a proposed design against the current graph.
- `refactor_impact` - Accepts a `moduleId` and prompts the model to assess the blast radius of modifying that module.

---

## Capabilities & Architecture

### Workspace Resolution
The server dynamically resolves the workspace root by looking for `workspace.json` or `.git` from the current working directory, unless explicitly overridden via startup arguments.

### Context Projection
When serving `owis://workspace/context/markdown`, the MCP server uses `@prodakwah/owis-context` to strip out verbose AST data and project a token-efficient summary.

### Streaming
Large graph queries (e.g., retrieving the entire `wir.json` for massive enterprise monorepos) will utilize MCP's streaming capabilities to prevent memory exhaustion in the client.

### Caching
The WIR graph is cached in memory. The server listens to filesystem events (via `chokidar` or similar) to perform incremental graph updates, invalidating only the affected subgraphs to ensure minimal latency on subsequent MCP requests.

---

## Security & Authorization

- **Read-Only:** The OWIS MCP server operates in a strict read-only mode regarding the filesystem. It parses code but cannot mutate it.
- **Local Authentication:** By default, the MCP server runs locally over stdio or a local WebSocket, relying on the host OS user permissions.
- **Remote Authorization (Future):** If exposed over HTTP/SSE, token-based authentication (Bearer tokens) will be required.

## Rate Limits

To prevent aggressive LLM agents from overwhelming the host machine with complex graph traversals, the MCP server will enforce a maximum depth for recursive queries and a token bucket rate limit on tool invocations.

## Future Compatibility

This specification maps to MCP v1.0. Future revisions will adopt MCP's pagination and advanced filtering capabilities once finalized upstream.
