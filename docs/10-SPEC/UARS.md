---
id: owis-uars
title: Universal Agent Runtime Specification
version: 0.1.0
status: canonical
category: Specification
last_updated: 2026-07-15
---

# **UNIVERSAL AGENT RUNTIME SPECIFICATION (UARS)** <Badge type="tip" text="Canonical" />

---

# Overview

The Universal Agent Runtime Specification (UARS) defines the master runtime contract for an AI IDE Agent operating inside a project workspace. 

---

# Purpose

The purpose of UARS is to establish how an agent must behave during discovery, ingestion, reasoning, planning, validation, and mutation of a project workspace. It prevents speculative updates and secures architectural boundaries.

---

# Scope

Included:
* Runtime settings (verbosity, autonomy, speculation parameters).
* Agent operating contract and execution steps.
* Ingestion pipelines, classification methods, and dependency mapping.
* Source-of-Truth tiers and conflict priority rules.
* Mutation and verification policies.

---

# Non Goals

Excluded:
* Specific command line utilities.
* Specific testing frameworks.
* Specific file-watching algorithms.

---

# Architecture

UARS governs the reasoning pipeline that an agent must execute during a task lifecycle:

```
[Ingest] → [Normalize] → [Index] → [Correlate] → [Audit] → [Resolve] → [Plan] → [Execute] → [Verify] → [Prune]
```

---

# Components

### **Runtime Settings**
Parameters governing speculation levels, autonomy, and code mutations.

### **Operating Contract**
Step-by-step requirements for indexing, planning, and validation.

### **Ingestion Pipeline**
The stages of workspace analysis from scan to safe mutation.

### **Source-of-Truth Hierarchy**
Tier systems determining file authorities when conflicts occur.

---

# Interfaces

UARS interacts with the workspace via metadata schemas and outputs the structured execution plans before modifying code.

---

# Constraints

* **Speculation Forbidden**: Agents must not make assumptions about missing rules or designs.
* **Minimal Diff**: Edits must be as small and surgical as possible.
* **Prioritization**: When conflicts occur, agents must strictly follow the tier rules.

---

# Future Extensions

Future versions will define standard interfaces for background watcher tasks and incremental hot-reloads during active code execution.
