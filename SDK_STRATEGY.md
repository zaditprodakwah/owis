# SDK Strategy

To achieve ubiquitous adoption, OWIS must be consumable programmatically across a variety of technology stacks. This document outlines the tier-based strategy for official language SDKs.

---

## SDK Capabilities & Minimum API

Regardless of language, an official OWIS SDK MUST provide:
1. **Runtime Invocation:** Programmatic interface to parse a repository and emit the WIR graph in memory.
2. **Context Engine:** Functions to project the WIR into Markdown or string representations suitable for LLMs.
3. **Graph Traversal:** Typed interfaces for querying nodes, edges, modules, and dependencies.
4. **Schema Validation:** Built-in typings and validation against the official OWIS JSON schemas.

---

## Tier 1: Core Implementations

These SDKs are developed and maintained directly by the core OWIS team. They receive feature updates synchronously with the specification.

### 1. Node.js (TypeScript)
- **Status:** Active (`@prodakwah/owis-sdk`)
- **Priority:** Highest
- **Scope:** Full feature parity with the reference runtime.
- **Release Target:** Sync with CLI versions.
- **Maintenance:** Core Team.

### 2. Python
- **Status:** Planned
- **Priority:** Highest
- **Scope:** Primary target for AI/ML frameworks (LangChain, LlamaIndex), Data Science, and backend AI integration. 
- **Release Target:** Q4
- **Maintenance:** Core Team.

---

## Tier 2: High-Performance & Systems

These SDKs target environments where speed and memory efficiency are paramount, particularly for large monorepos or native editor integrations.

### 1. Go
- **Status:** Planned
- **Priority:** High
- **Scope:** Fast CLI integrations, backend services, CI/CD tooling.
- **Release Target:** TBD
- **Maintenance:** Community / Core Team collaboration.

### 2. Rust
- **Status:** Planned
- **Priority:** High
- **Scope:** WASM compilation targets, native editor plugins, maximum performance parsing.
- **Release Target:** TBD
- **Maintenance:** Community / Core Team collaboration.

---

## Tier 3: Enterprise & Web Environments

These SDKs serve legacy enterprise environments and traditional web backends.

### 1. Java / Kotlin
- **Status:** Planned
- **Priority:** Medium
- **Scope:** Enterprise CI/CD pipelines, legacy integrations, Spring Boot ecosystems.
- **Maintenance:** Community-driven.

### 2. C# (.NET)
- **Status:** Planned
- **Priority:** Medium
- **Scope:** Enterprise Windows environments, Visual Studio integration.
- **Maintenance:** Community-driven.

### 3. PHP
- **Status:** Planned
- **Priority:** Low
- **Scope:** Integration into popular PHP monolithic frameworks (Laravel, Symfony) for architecture validation.
- **Maintenance:** Community-driven.

---

## Maintenance & Lifecycle

- **Tier 1 SDKs** follow the strict semantic versioning of the OWIS specification. Breaking changes in the API require a major version bump.
- **Tier 2 & 3 SDKs** must pass the official OWIS Conformance Test Suite (defined in Phase 19) to be listed in the official documentation.
- **Deprecation Policy:** A minimum of 6 months notice must be given before deprecating an official SDK.
