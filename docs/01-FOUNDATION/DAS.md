---
id: owis-das
title: Document Architecture Specification
version: 1.0
status: canonical
category: Foundation
last_updated: 2026-07-15
---

# **DOCUMENT ARCHITECTURE SPECIFICATION (DAS)** <Badge type="tip" text="Canonical" />

---

# Overview

The Document Architecture Specification (DAS) defines the official structure of the project's documentation, document relationships, responsibilities of each document, consumption order, and scope boundaries.

---

# Purpose

The purpose of the DAS is to establish a meta-specification governing the entire documentation system. It ensures that all documentation files are single-responsibility, version-controlled, machine-readable, and free from duplication.

---

# Scope

Included:
* Documentation hierarchy definitions.
* Repository documentation directory structure.
* Dependency rules between document layers.
* Version change and stability policies.
* Canonical document source of truth matrix.

---

# Non Goals

Excluded:
* Runtime implementation rules.
* Technical data structure schemas.
* Local development tool configurations.
* Platform-specific deployment tutorials.

---

# Architecture

The documentation system is organized in a hierarchical stack where higher layers define and govern lower layers.

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

---

# Components

### **00-CONSTITUTION**
Vision, principles, and strategic direction of the project (e.g. `Project_Constitution.md`).

### **01-FOUNDATION**
Meta-specifications and ontology frameworks (e.g. `DAS.md`, `CAS.md`, `RAS.md`).

### **10-SPEC**
Core operational specifications and runtime contracts (e.g. `UARS.md`, `WIR.md`).

### **20-SCHEMA**
Machine-readable schemas (e.g. `workspace.schema.yaml`).

### **30-REFERENCE**
Informational examples and language implementations (e.g. `examples/`).

### **40-ECOSYSTEM**
Ecosystem adapters and compatibility maps (e.g. Cursor, Claude Code).

### **50-TOOLING**
Official CLI, SDK, and validator utilities.

---

# Interfaces

Reading order hierarchy and dependency rules define the internal interface of the documentation portal:
```
DAS → Project Constitution → Specifications → Schemas → References → Ecosystem → Tooling
```

---

# Constraints

* **Hierarchy Direction**: Dependencies must only point downwards. Lower layers SHALL NOT redefine higher layers.
* **Single Source of Truth**: Autoritative information must exist in exactly one document.
* **No Circular Dependencies**: Cross-referencing that forms cycles is prohibited.

---

# Future Extensions

Future layers (such as schemas, reference runtimes, and validation tools) will be integrated directly into the directory hierarchy as they are defined.
