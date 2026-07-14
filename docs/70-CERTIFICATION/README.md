---
id: owis-certification-spec
title: Certification Specification
version: 1.0.0-draft
status: canonical
category: Certification
last_updated: 2026-07-15
---

# **CERTIFICATION SPECIFICATION** <Badge type="tip" text="Canonical" />

---

# Overview

The OWIS Certification is a compliance testing model designed to verify that an AI IDE Agent conforms to the Universal Agent Runtime Specification (UARS).

---

# Purpose

The purpose of this specification is to establish standard compliance testing suites, test-case mocks, assertion guidelines, and certification tiers (e.g. Compliant, Advanced, Master) for executing agents.

---

# Scope

Included:
* Compliance assertion rules.
* Mock workspace test cases.
* Speculation and mutation violation checks.
* Certification level criteria.

---

# Non Goals

Excluded:
* Automated deployment of test containers.
* Platform-specific telemetry dashboards.

---

# Architecture

Compliance validation flow:

```
AI IDE Agent (Under Test)
        │
        ▼
Mock Workspace Test Cases (Assertions)
        │
        ▼
UARS Compliance Checker (Report Output)
```

---

# Components

### **Compliance Checker**
Monitors agent commands and edits for UARS rule compliance.

### **Mocks Catalog**
Provides standardized code workspaces representing various programming frameworks.

---

# Interfaces

To trigger compliance testing:

```bash
owis-test --target my-agent --workspace examples/test-workspace
```

---

# Constraints

* Agents must obtain a 100% pass score on standard UARS rules (no speculation, minimal edits) to receive certification.
* Checks must execute inside isolated local sandboxes to protect workspace privacy.

---

# Future Extensions

Future updates will introduce active interactive evaluation environments where the test runner poses mock developer requests to test agent adaptability.
