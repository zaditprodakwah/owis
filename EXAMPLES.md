# OWIS Examples Repository

This document outlines the official examples provided by the OWIS project. These example repositories are designed to demonstrate how to integrate, extend, and consume OWIS in various environments.

They are maintained in the `examples/` directory of this repository.

---

## 1. Minimal (`hello-world`)
- **Purpose:** Demonstrate the absolute minimum configuration required to initialize OWIS and generate a `wir.json`.
- **Learning Goals:** 
  - Understanding `workspace.json`
  - Running the CLI
  - Inspecting the emitted Graph
- **Difficulty:** Beginner

## 2. OSS Library (`small-library`)
- **Purpose:** Show how a typical open-source TypeScript or Python library uses OWIS for architecture linting.
- **Learning Goals:**
  - Using `@prodakwah/owis-lint` in CI
  - Defining architecture boundaries
  - Export controls
- **Difficulty:** Beginner to Intermediate

## 3. Full-Stack Framework (`nextjs-app`)
- **Purpose:** Demonstrate how OWIS handles framework-specific conventions, file-based routing, and complex dependency structures in a modern web application.
- **Learning Goals:**
  - Handling Next.js App Router conventions
  - Resolving client vs. server components in the Graph
- **Difficulty:** Intermediate

## 4. Scalable Architecture (`enterprise-monorepo`)
- **Purpose:** A complex, multi-package monorepo (e.g., Nx or Turborepo) showcasing OWIS's ability to map cross-package boundaries and enforce strict governance.
- **Learning Goals:**
  - Workspace resolution across multiple `package.json` boundaries
  - Cross-module linting rules
  - CI/CD diff generation
- **Difficulty:** Advanced

## 5. Technical Documentation (`documentation-site`)
- **Purpose:** Illustrate how OWIS Context output can be piped directly into static site generators (like VitePress or Docusaurus) to auto-generate architectural diagrams and API references.
- **Learning Goals:**
  - Consuming `context.json` programmatically
  - Rendering Markdown from OWIS
- **Difficulty:** Intermediate

## 6. AI Context Injection (`ai-agent`)
- **Purpose:** A reference implementation of a small CLI agent that uses OWIS to feed targeted context to an LLM, dramatically improving code generation and refactoring.
- **Learning Goals:**
  - Using `@prodakwah/owis-context` SDK
  - Prompt construction with WIR
- **Difficulty:** Advanced

## 7. Extending OWIS (`plugin`)
- **Purpose:** A boilerplate project showing how to author, test, and publish a custom OWIS plugin.
- **Learning Goals:**
  - Implementing the Plugin interface
  - Adding custom Graph nodes/edges
  - Hooking into the runtime lifecycle
- **Difficulty:** Advanced
