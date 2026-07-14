# OWIS

Open Workspace Intelligence Specification (OWIS) is an open interoperability standard that normalizes software workspace context, enabling consistent and deterministic project understanding for both humans and AI IDE Agents.

---

## Overview

Today, AI software engineering is limited not by code generation capability, but by the ability of AI assistants to understand projects deterministically. OWIS provides a neutral, structured layer between the software codebase and AI runtimes, establishing a canonical source of truth and clear guidelines for safe workspace mutations.

---

## Mission

* **Describe** how AI understands a workspace.
* **Generate** a canonical representation of a project.
* **Reduce** context loss, architecture drift, and AI slop.
* **Enable** interoperability between AI IDE Agents.
* **Establish** a foundation for tooling, validation, and governance.

---

## Core Principles

* **Workspace First**: The workspace is the primary unit of analysis.
* **Knowledge Before Execution**: AI must understand the project before making mutations.
* **Documentation as Primary Signal**: System design and constraints are defined by documentation.
* **Intelligence Before Mutation**: Planning is required before any source code changes are executed.
* **Deterministic Understanding**: AI reasoning must be reproducible.

---

## Documentation Map

This repository is organized according to the **Document Architecture Specification (DAS)**:

### 00-CONSTITUTION
* [Project Constitution](docs/00-CONSTITUTION/Project_Constitution.md): Core vision, mission, and guiding principles.
* [Documentation Governance](docs/00-CONSTITUTION/DOCUMENTATION_GOVERNANCE.md): Rules governing specifications as a controlled system.
* [Architecture Index](docs/00-CONSTITUTION/ARCHITECTURE_INDEX.md): Machine-readable directory map of the specification layers.

### 01-FOUNDATION
* [Document Architecture Specification (DAS)](docs/01-FOUNDATION/DAS.md): Structure, layer definitions, and read hierarchy.
* [Core Architecture Specification (CAS)](docs/01-FOUNDATION/CAS.md): Conceptual model and workspace ontology.
* [Reference Architecture Specification (RAS)](docs/01-FOUNDATION/RAS.md): Component mappings and runtime pipelines.

### 10-SPEC (Core Specifications)
* [Universal Agent Runtime Specification (UARS)](docs/10-SPEC/UARS.md): Operating contract governing agent mutations.
* [Workspace Intelligence Report Specification (WIR)](docs/10-SPEC/WIR.md): Canonical output data schemas.

---

## Quick Start

To get started with OWIS as a developer, contributor, or AI agent, please read the [Getting Started Guide](getting_started.md). 

This guide details:
1. The repository structure and document reading order.
2. The current status of different specification phases.
3. Guidelines for contributing specs or schemas.

---

## Project Status

**Current Release: OWIS v0.1.0**

OWIS has reached its **Public Specification Baseline**.
Available via:
- **GitHub Release**: [v0.1.0](https://github.com/zaditprodakwah/owis/releases/tag/v0.1.0)
- **NPM CLI**: `npm install -g owis`
- **NPM SDK**: `npm install owis-sdk`
- **Documentation Portal**: [https://zaditprodakwah.github.io/owis/](https://zaditprodakwah.github.io/owis/)

---

## Links

* [Getting Started Guide](getting_started.md)
* [Project Roadmap](roadmap.md)
* [Contributing Guidelines](contributing.md)
* [Changelog](changelog.md)
* [Code of Conduct](code_of_conduct.md)
* [MIT License](license.md)
