# Canonical AI Context Specification

OWIS provides a standardized, provider-neutral representation of a workspace called the **Context Layer**. This layer allows any downstream LLM or agent framework (e.g., OpenAI, Anthropic, Langchain, CrewAI, AutoGen) to ingest the workspace structure deterministically without coupling to a specific AI vendor.

## Philosophy
- **OWIS produces context.**
- **LLMs consume context.**
- The Context Layer is a pure projection of existing OWIS artifacts (WIR, Graph, Linter Report).
- It never executes prompts, orchestrates agents, or maintains conversation state.

## Context Budget & Sanitization
Before serialization, all contexts undergo a strict pipeline:
1. **Secret Redaction**: API keys and tokens are redacted (`[REDACTED]`).
2. **Path Filtering**: Absolute user home paths are replaced (`~`).
3. **Prompt Injection Detection**: Known injection patterns in metadata are cleared.
4. **Budget Enforcement**: To avoid exceeding token limits, the context gracefully truncates data (dropping graph nodes first, then quality reports, etc.).

## Adapter Interface
Downstream consumers can build their own adapters by implementing this contract:
```javascript
module.exports = {
  supports: (context) => boolean,
  serialize: (context) => any
};
```
