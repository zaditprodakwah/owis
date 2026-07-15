# RFC-002: LLM Native Integration

## Status

Implemented (Version: 0.2.0-beta.1)


## Problem Statement

While OWIS provides structured intelligence via the WIR (Workspace Intelligence Report), LLMs and AI Agents (like LangChain, CrewAI, AutoGen) currently require manual prompt engineering to ingest and understand this JSON structure. There is no native bridge that allows an AI agent to seamlessly consume a WIR and "understand" the workspace context out-of-the-box.

## Motivation

Make OWIS understandable by AI agents without manual prompting.
```
OWIS Context Layer
        +
LLM Agent
        =
Workspace-aware reasoning
```

## Proposed Solution

Develop native integration layers and context wrappers for popular LLM agent frameworks.
Possible integrations to research:
* LangChain (Document Loader)
* CrewAI (Tools/Context Integration)
* AutoGen (System Message Builder)
* MCP-compatible tools (Model Context Protocol)

Define the context format and agent consumption flow.

## Architecture Impact

- No changes to the core `owis-runtime` logic.
- Requires building new external packages or expanding the `owis-sdk` to export context builders (e.g., `owis-sdk/langchain`).

## Backward Compatibility

- Fully preserves v0.1.0 compatibility as this builds on top of the existing WIR specification without mutating the core engine.

## Security Considerations

- **Prompt Injection Protection**: The WIR may contain malicious strings from an untrusted workspace (e.g., a file named `ignore all previous instructions`). The integration layer must sanitize inputs and define strict security boundaries before passing the WIR context into an LLM prompt.

## Implementation Plan

Do not implement yet.
Only define:
* context format
* agent consumption flow
* security boundaries
* prompt injection protection

## Open Questions

- Should we build official plugins directly submitted to LangChain/CrewAI upstream, or maintain them in the OWIS monorepo?
