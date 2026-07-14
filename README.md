# **Open Workspace Intelligence Specification (OWIS)**

An open interoperability standard that normalizes software workspace context, enabling consistent and deterministic project understanding for both humans and AI IDE Agents.

---

## **Why OWIS?**

Today, every AI IDE Agent builds its own ad-hoc model of a project. This fragmentation leads to context collapse, duplicate code, architecture drift, and inconsistent agent behavior.

OWIS provides a neutral, structured layer between the software codebase and AI runtimes, establishing a canonical source of truth and clear guidelines for safe workspace mutations.

---

## **Documentation Architecture**

This repository is organized according to the **Document Architecture Specification (DAS)**:

### **00-CONSTITUTION**
* [Project Constitution](docs/00-CONSTITUTION/Project_Constitution.md): The core vision, mission, and guiding design principles of the project.

### **01-FOUNDATION**
* [Document Architecture Specification (DAS)](docs/01-FOUNDATION/DAS.md): Structure, ownership, and read hierarchy of all project documents.
* [Core Architecture Specification (CAS)](docs/01-FOUNDATION/CAS.md): Official conceptual model and domain ontology of workspace intelligence.
* [Reference Architecture Specification (RAS)](docs/01-FOUNDATION/RAS.md): Component mapping, pipeline details, and communication flow.

### **10-SPEC (Core Specifications)**
* [Universal Agent Runtime Specification (UARS)](docs/10-SPEC/UARS.md): Master runtime contract governing how AI agents discover, plan, and execute within a workspace safely.
* [Workspace Intelligence Report Specification (WIR)](docs/10-SPEC/WIR.md): Canonical data schema representing the AI agent's synthesized workspace understanding.

---

## **Ecosystem Status**

* **Roadmap & Objectives**: Learn about our target milestones and KPIs in the [Project Roadmap](ROADMAP.md).
* **Contributing**: We welcome open specifications and community integrations! Read the [Contributing Guide](CONTRIBUTING.md).
* **Release History**: Track core changes in the [Changelog](CHANGELOG.md).

---

## **License**

This specification is released under the **MIT License**. For commercial licensing details of premium tooling, consult the Business Model section in the Project Constitution.
