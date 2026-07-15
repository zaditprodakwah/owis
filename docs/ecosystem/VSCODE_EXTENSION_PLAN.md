# VSCode Extension Integration Plan

As part of the OWIS ecosystem roadmap, an official Visual Studio Code extension is planned to bring real-time architectural intelligence directly into the developer's IDE.

## Core Features

### 1. Real-Time WIR Visualization
- A sidebar panel that visualizes the Workspace Intelligence Record (`wir.json`) as an interactive graph.
- Selecting a file in the editor automatically highlights its node in the graph, showing immediate upstream dependencies and downstream consumers.

### 2. Intelligent Linting (Live Diagnostics)
- Integration with `@prodakwah/owis-lint`.
- Violations of `workspace.json` constraints (e.g., a UI component importing a Database module) will show up immediately as squiggly lines in the editor, rather than waiting for a CI pipeline to fail.

### 3. Contextual Tooltips
- Hovering over an import statement will display metadata from the WIR, such as the target module's defined layer, domain, and external dependencies.

## Architecture & Implementation
The extension will run as a Language Server Protocol (LSP) client or standard extension host process.
It will spawn the `@prodakwah/owis-runtime` in a worker thread. To maintain performance, the extension will listen for file system events (`onDidSaveTextDocument`) and trigger incremental graph updates rather than full workspace scans.

## Timeline
Development of the VSCode extension will commence following the stable release of OWIS v1.0.0, ensuring the underlying specification is fully locked and the Graph extraction logic is highly optimized.
