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
* [Project Constitution](docs/00-CONSTITUTION/Project_Constitution.md): The core vision, mission, and guiding design principles of the project.

### 01-FOUNDATION
* [Document Architecture Specification (DAS)](docs/01-FOUNDATION/DAS.md): Structure, ownership, and read hierarchy of all project documents.
* [Core Architecture Specification (CAS)](docs/01-FOUNDATION/CAS.md): Official conceptual model and domain ontology of workspace intelligence.
* [Reference Architecture Specification (RAS)](docs/01-FOUNDATION/RAS.md): Component mapping, pipeline details, and communication flow.

### 10-SPEC (Core Specifications)
* [Universal Agent Runtime Specification (UARS)](docs/10-SPEC/UARS.md): Master runtime contract governing how AI agents discover, plan, and execute within a workspace safely.
* [Workspace Intelligence Report Specification (WIR)](docs/10-SPEC/WIR.md): Canonical data schema representing the AI agent's synthesized workspace understanding.

---

## Quick Start

To get started with OWIS as a developer, contributor, or AI agent, please read the [Getting Started Guide](GETTING_STARTED.md). 

This guide details:
1. The repository structure and document reading order.
2. The current status of different specification phases.
3. Guidelines for contributing specs or schemas.

---

## Project Status

OWIS is currently in the **Foundation & Specification** phases. All foundational architecture documents and core specification candidates are draft canonical and frozen. Downstream components (JSON/YAML schemas, CLIs, and SDKs) are scheduled for upcoming stages.

---

## Links

* [Getting Started Guide](GETTING_STARTED.md)
* [Project Roadmap](ROADMAP.md)
* [Contributing Guidelines](CONTRIBUTING.md)
* [Changelog](CHANGELOG.md)
* [Code of Conduct](CODE_OF_CONDUCT.md)
* [MIT License](LICENSE.md)
