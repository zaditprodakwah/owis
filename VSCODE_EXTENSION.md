# OWIS VS Code Extension Blueprint

*Status: Design Only.*

## Overview

The OWIS VS Code extension brings the power of the Workspace Intelligence Representation directly into the developer's primary IDE. By deeply integrating with VS Code's Language Server Protocol (LSP) and webview API, it offers real-time architectural validation, graphing, and AI context capabilities.

---

## Features

### Workspace Scan
- **Behavior:** On initialization, the extension detects `workspace.json` and runs a silent, background OWIS build to generate the in-memory WIR.
- **Trigger:** Folder open or explicit command.

### Diagnostics
- **Behavior:** Highlights architectural violations (e.g., circular dependencies, invalid boundary imports) directly in the editor as red/yellow squiggly lines.
- **Provider:** Integrates with VS Code's `DiagnosticCollection`.

### Code Actions & Quick Fix
- **Behavior:** Provides actionable fixes for linting violations.
- **Example:** "Extract to shared module" or "Add exception to workspace.json".

### Hover
- **Behavior:** Hovering over an import statement displays the OWIS metadata for the target module (owner, lifecycle status, architectural tier).

### Graph Preview
- **Behavior:** A rich, interactive Webview panel rendering the WIR graph using D3.js or React Flow.
- **Functionality:** Users can click a module in the text editor and see the graph update to center on that module's dependency tree.

### Schema Preview
- **Behavior:** Hovering over or interacting with `workspace.json` provides rich IntelliSense and schema validation.

### Outline & Tree View
- **Behavior:** Adds a custom view to the VS Code Explorer sidebar called "OWIS Architecture", showing the logical module groupings rather than just the physical file tree.

### Problems
- **Behavior:** Funnels all `@prodakwah/owis-lint` outputs into the native VS Code Problems panel.

### Command Palette
- **Commands Exposed:**
  - `OWIS: Rebuild Graph`
  - `OWIS: Show Architecture Graph`
  - `OWIS: Export Context to Clipboard`
  - `OWIS: Initialize Workspace`

### Context Preview
- **Behavior:** A panel that shows exactly what the AI sees when `owis context` is run for the currently active file, helping developers debug why an AI agent might be hallucinating.

### AI Assist
- **Behavior:** Hooks into the GitHub Copilot Chat extension (if available) via participants API to inject the OWIS context transparently into prompts.

---

## Technical Constraints

### Performance Budget
- The LSP server must parse incremental file changes and update the diagnostic state in **< 150ms**.
- The full workspace scan must not block the main extension thread.

### Telemetry Policy
- **Strictly Opt-In.** By default, no telemetry is collected regarding workspace structure or graph size.
- If enabled by the user, telemetry only collects generic performance metrics (e.g., time to build graph) to aid in optimizing the core runtime.

---

## Development Roadmap

1. **Phase 1: Diagnostics & LSP** - Implement the language server wrapper around `@prodakwah/owis-lint`.
2. **Phase 2: Tree View & Commands** - Add the sidebar and basic command palette interactions.
3. **Phase 3: Webview Graph** - Implement the D3-based interactive architecture visualizer.
4. **Phase 4: AI Context Hooks** - Integrate with Copilot Chat and generate context snippets.
