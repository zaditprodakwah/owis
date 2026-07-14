---
id: owis-wir
title: Workspace Intelligence Report Specification
version: 1.0.0-draft
status: canonical
category: Specification
last_updated: 2026-07-15
---

# **WORKSPACE INTELLIGENCE REPORT SPECIFICATION (WIR)** <Badge type="tip" text="Canonical" />

---

# Overview

The Workspace Intelligence Report (WIR) defines the canonical project intelligence model that an AI IDE Agent MUST generate after completing workspace ingestion and before executing any implementation tasks.

---

# Purpose

WIR represents the agent's validated understanding of the current workspace. It serves as a machine-readable blueprint mapping the codebase ontology, constraints, and dependencies cleanly.

---

# Scope

Included:
* Structured YAML/JSON schemas representing scanned codebases.
* Definitions for knowledge, technology stacks, API contracts, and domain models.
* Audit reports (conflicts, gaps, and missing details).
* Confidence scales and execution readiness indicators.

---

# Non Goals

Excluded:
* Formatted markdown summaries for user reading.
* Interactive chat records.
* Specific code generation files or patches.

---

# Architecture

WIR serves as the canonical contract between ingestion engines and execution engines in the reference pipeline:

```
[Ingestion Engine] → [WIR Output (YAML/JSON)] → [Execution Engine]
```

---

# Components

### **Canonical Schema**
The strict data format detailing workspace, project, security, constraints, and quality metrics.

### **Confidence Scale**
The rating metric indicating the completeness of the workspace analysis.

### **Execution Readiness**
The status flagging whether it is safe for the agent to proceed.

---

# Interfaces

WIR is generated as a structured file consumed directly by AI execution adapters.

---

# Constraints

* **No Narrative**: The report must contain zero conversational filler, opinions, or greetings.
* **Traceable**: Every entry must be traceably linked to its Source of Truth artifact.

---

# Future Extensions

Future revisions will add schema blocks to model asynchronous messaging systems and cloud container topologies.
