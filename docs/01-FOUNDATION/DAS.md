# **DOCUMENT ARCHITECTURE SPECIFICATION (DAS)**

**Status:** Canonical  
**Version:** 1.0  
**Layer:** Foundation Architecture  
**Audience:** AI IDE Agents, AI Software Engineers, OSS Maintainers, Contributors

---

# **1. Purpose**

The Document Architecture Specification (DAS) defines the official structure of the project's documentation, document relationships, responsibilities of each document, consumption order, and scope boundaries.

DAS is not a technical specification, but rather a meta-specification governing the entire documentation system.

All project documentation must comply with the DAS.

---

# **2. Objectives**

* Establish a consistent documentation structure.
* Prevent information duplication.
* Define the Source of Truth for each type of information.
* Define dependencies between documents.
* Enable both AI and humans to understand the project deterministically.
* Support specification evolution without modifying the documentation architecture.

---

# **3. Documentation Principles**

All documents must adhere to the following principles:

* **Single Responsibility**: Each document has one specific job.
* **Single Source of Truth**: No information is duplicated across multiple authoritative files.
* **Documentation First**: Docs are written before coding.
* **Specification Before Implementation**: Formal specifications define the code, not vice-versa.
* **Machine Readable Friendly**: Structured layouts that LLMs can parse accurately.
* **Human Readable Friendly**: Clear typography, summaries, and hierarchies.
* **Version Controlled**: Everything lives in Git.
* **Vendor Agnostic**: Documentation is not tied to a single platform or IDE.
* **Backward Conscious**: Mindful of changes that break compatibility.
* **Minimal Duplication**: Cross-link rather than copy-paste.

---

# **4. Documentation Hierarchy**

```
Document Architecture Specification (DAS)
        │
        ▼
00-CONSTITUTION
        │
        ▼
10-SPEC
        │
        ▼
20-SCHEMA
        │
        ▼
30-REFERENCE
        │
        ▼
40-ECOSYSTEM
        │
        ▼
50-TOOLING
```

Higher layers define lower layers. Lower layers SHALL NOT redefine higher layers.

---

# **5. Reading Order**

```
1. DAS (Document Architecture Specification)
    ↓
2. Project Constitution (Vision and Philosophy)
    ↓
3. Specifications (Core logic and contracts)
    ↓
4. Schemas (Data structures)
    ↓
5. References (Examples and guides)
    ↓
6. Ecosystem (Compatibility maps)
    ↓
7. Tooling (Official CLI, SDK, and validators)
```

---

# **6. Repository Structure**

```
docs/
  00-CONSTITUTION/
  01-FOUNDATION/
  10-SPEC/
  20-SCHEMA/
  30-REFERENCE/
  40-ECOSYSTEM/
  50-TOOLING/
```

---

# **7. Layer Definitions**

---

## **00-CONSTITUTION**

### **Purpose**
Defines the identity, vision, philosophy, scope, principles, and strategic direction of the project.
* *Question answered:* "Why does this project exist?"

### **Characteristics**
* Canonical
* Human-oriented
* Stable
* High-level
* Rarely Changed

### **Source of Truth**
All strategic project decisions.

### **Primary Audience**
* Maintainers
* Architects
* Contributors
* Community
* AI Agents

### **Contains**
* Vision, Mission, Principles, Positioning, Business Strategy, Scope, Non-goals, Governance Philosophy.

### **Must NOT Contain**
* Runtime Rules, Schemas, Implementation Details, Examples, Generated Outputs.

### **Documents**
* `Project_Constitution.md`

---

## **01-FOUNDATION**

### **Purpose**
Defines the fundamental specifications of the project architecture and the documentation framework.
* *Question answered:* "What are the structural rules and conceptual models of OWIS?"

### **Characteristics**
* Foundation Architecture
* Meta-specification
* Conceptual

### **Source of Truth**
* Core Architecture and Document Architecture rules.

### **Primary Audience**
* Architects, Maintainers, AI Agents, Contributors.

### **Contains**
* `DAS.md` (Document Architecture Specification)
* `CAS.md` (Core Architecture Specification)
* `RAS.md` (Reference Architecture Specification)

---

## **10-SPEC**

### **Purpose**
Defines the behavior, rules, contracts, lifecycle, and terminology of the system.
* *Question answered:* "How does the system operate?"

### **Characteristics**
* Normative
* Canonical
* Deterministic

### **Source of Truth**
All operational and runtime rules.

### **Primary Audience**
* AI IDE Agents, Tool Developers, Specification Authors.

### **Contains**
* `UARS.md` (Universal Agent Runtime Specification)
* `WIR.md` (Workspace Intelligence Report Specification)
* `SPEC_Terminology.md` (Terminology Glossary)
* `SPEC_Lifecycle.md` (Standard AI Lifecycle)

---

## **20-SCHEMA**

### **Purpose**
Defines formal, machine-validatable representations.
* *Question answered:* "How is data represented?"

### **Characteristics**
* Machine Readable
* Validation Ready
* Strict

### **Source of Truth**
All data structures.

### **Primary Audience**
* Validators, SDKs, CLIs, AI Agents, Tooling developers.

### **Documents**
* `workspace.schema.yaml`
* `uars.schema.yaml`
* `wir.schema.yaml`
* `knowledge.schema.yaml`
* `artifact.schema.yaml`
* `dependency.schema.yaml`

---

## **30-REFERENCE**

### **Purpose**
Provides informative, real-world reference implementations.
* *Question answered:* "How is the specification applied in practice?"

### **Characteristics**
* Informative
* Educational
* Reproducible

### **Source of Truth**
None. Reference implementations must never serve as the Source of Truth.

### **Primary Audience**
* Users, Contributors, Educators, AI Agents.

### **Structure**
`examples/` containing implementations in `nextjs/`, `laravel/`, `go/`, `python/`, `rust/`, `java/`, etc.

---

## **40-ECOSYSTEM**

### **Purpose**
Defines interoperability and compatibility mappings with external ecosystems.
* *Question answered:* "How does the specification interact with third-party tools?"

### **Characteristics**
* Vendor Neutral
* Adapter Oriented
* Compatibility Focused

### **Source of Truth**
Integration Mapping.

### **Primary Audience**
* Integration Developers, Platform Authors, OSS Maintainers.

### **Example Targets**
Cursor, Claude Code, Codex, Gemini CLI, OpenHands, Continue, Aider, Roo Code, Windsurf.

---

## **50-TOOLING**

### **Purpose**
Defines the official tooling built directly on top of the specification.
* *Question answered:* "How is the specification used operationally?"

### **Characteristics**
* Optional
* Extensible
* Implementation-Specific

### **Source of Truth**
Official Tooling codebase.

### **Primary Audience**
* SDK Developers, CLI Developers, Maintainers.

### **Contains**
CLI, SDK, Validator, Inspector, Generator, Linter.

---

# **8. Dependency Rules**

```
Constitution
    ↓
Specification (Foundation & Core)
    ↓
Schema
    ↓
Reference
    ↓
Ecosystem
    ↓
Tooling
```

Dependencies must only point downwards. Circular dependencies are strictly prohibited.

---

# **9. Change Policy**

| Layer | Expected Stability |
| ----- | ------------------ |
| Constitution | Very High |
| Foundation | High |
| Specification | High |
| Schema | Medium |
| Reference | Medium |
| Ecosystem | Medium |
| Tooling | Low |

---

# **10. Source of Truth Matrix**

| Information | Canonical Document |
| ----------- | ------------------ |
| Vision & Philosophy | `Project_Constitution.md` |
| Document Rules | `DAS.md` |
| Conceptual Model | `CAS.md` |
| Component Layout | `RAS.md` |
| Runtime Behavior | `UARS.md` |
| Workspace Intelligence | `WIR.md` |
| Terminology | `SPEC_Terminology.md` |
| Lifecycle | `SPEC_Lifecycle.md` |
| Data Structures | `20-SCHEMA/` |
| Examples | `30-REFERENCE/` |
| Integrations | `40-ECOSYSTEM/` |
| Official Tools | `50-TOOLING/` |

---

# **11. Architecture Freeze**

Modifications to the DAS structure are only allowed if:
* A new layer is required that cannot be accommodated by the current structure.
* A fundamental change occurs in the project scope.
* A major specification revision is approved by the maintainers.

All new documents must map to one of the DAS layers and must not duplicate another layer's responsibilities.
