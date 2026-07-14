# Getting Started

Welcome to the Open Workspace Intelligence Specification (OWIS). This guide helps developers, contributors, and AI agents quickly understand the structure, read hierarchy, and development flow of the OWIS repository.

---

## What is OWIS

OWIS is an open standard designed to enable software workspaces to be understood consistently and deterministically by both human developers and AI IDE Agents. Rather than having every AI assistant compile an ad-hoc model of a project, OWIS provides a normalized knowledge model that prevents context loss, duplication, and architectural drift.

---

## Repository Overview

The repository is structured to separate strategic guidelines, conceptual architecture, core specification logic, and metadata definitions:

* **`/` (Root)**: Contains strategic files, roadmap, contribution covenants, and licenses.
* **`docs/00-CONSTITUTION/`**: Contains the core vision and design principles of the project.
* **`docs/01-FOUNDATION/`**: Defines the meta-specifications, ontology, and component architecture.
* **`docs/10-SPEC/`**: Contains core normative runtime specifications and standardized schemas.
* **`website/`**: Houses the static-first documentation portal configurations.

---

## Documentation Reading Order

To understand OWIS properly, we recommend reading the files in the following order:

1. **`README.md`**: Provides a high-level introduction to the project.
2. **`GETTING_STARTED.md`**: (This document) Offers an operational overview and guide for new users.
3. **Project Constitution (`docs/00-CONSTITUTION/Project_Constitution.md`)**: Lays out the vision, thesis, and core principles.
4. **Foundation Specifications (`docs/01-FOUNDATION/`)**:
   - `DAS.md` (Document Architecture Specification)
   - `CAS.md` (Core Architecture Specification)
   - `RAS.md` (Reference Architecture Specification)
5. **Technical Specifications (`docs/10-SPEC/`)**:
   - `UARS.md` (Universal Agent Runtime Specification)
   - `WIR.md` (Workspace Intelligence Report Specification)

---

## Current Project Status

OWIS has reached its **Public Specification Baseline (v0.1.0)**. 
All foundational architecture documents (`DAS.md`, `CAS.md`, `RAS.md`), core specifications (`UARS.md`, `WIR.md`), JSON schemas, CLI runtime, and SDKs are now available for external consumption and adoption testing.

You can install the CLI globally via `npm install -g owis` or integrate the SDK via `npm install owis-sdk`.

---

## Development Workflow

When modifying or contributing to this repository:
1. Ensure all conceptual changes align with the Core Thesis in the Project Constitution.
2. Document updates must strictly follow the Single Responsibility principle defined in the Document Architecture Specification (DAS).
3. Do not modify files in-place without preserving their respective metadata and authority.

---

## Contribution Flow

We welcome contributions to the OWIS standard!
1. Consult `CONTRIBUTING.md` for branch naming and formatting requirements.
2. Ensure any updates to the specs do not introduce internal contradictions.
3. Verify that the static website builds successfully with `npx vitepress build website` before opening a pull request.
