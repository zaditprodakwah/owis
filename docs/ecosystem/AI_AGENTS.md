# Integrating OWIS with AI Agents

OWIS is natively designed to solve the "context window" and "hallucination" problems when providing large codebases to LLMs. Instead of arbitrarily pasting files into a prompt or relying on imperfect vector search (RAG), OWIS provides the LLM with a highly structured, token-optimized graph of the workspace.

## The Problem OWIS Solves
When an AI agent tries to modify a codebase, it often lacks the architectural context:
- *What other modules import the function I am changing?*
- *What is the permitted dependency flow?*
- *Where are the domain boundaries?*

OWIS extracts this exact information and compresses it into a deterministic format.

## Recommended Workflow for AI Agents

1. **Extract Context**: Run `owis context --adapter markdown` (or use the `@prodakwah/owis-context` SDK).
2. **System Prompt Injection**: Prepend the output of the context extraction to the AI's system prompt.
   ```text
   You are an expert AI developer. You have access to the following workspace architecture:
   
   <OWIS_CONTEXT>
   (Output of owis context goes here)
   </OWIS_CONTEXT>
   
   When modifying code, ensure you respect the dependency rules and boundaries defined above.
   ```
3. **Execution**: The LLM now "understands" the shape of the repository. If it needs to modify a specific file, it already knows exactly what that file imports and what imports it, reducing the chance of breaking downstream code.

## Supported Adapters
The `@prodakwah/owis-context` package provides adapters specifically tailored for different AI providers:
- `markdown`: Best for standard prompt injection (Claude, ChatGPT).
- `json`: Best for agents that parse structured data or use function calling.

For RFC details on LLM integration, see [RFC-002: LLM Integration](../80-RFC/RFC-002-LLM-INTEGRATION.md).
