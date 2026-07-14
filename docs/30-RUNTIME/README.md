---
id: owis-runtime-spec
title: Reference Runtime Specification
version: 0.1.0
status: canonical
category: Runtime
last_updated: 2026-07-15
---

# **REFERENCE RUNTIME SPECIFICATION** <Badge type="tip" text="Canonical" />

---

# Overview

The OWIS Reference Runtime is a Node.js engine that implements workspace discovery, schema validation, and WIR generation.

---

# Purpose

The purpose of this runtime is to provide a concrete, vendor-agnostic reference implementation of the parsing and validation logic defined across the UARS and WIR specifications.

---

# Scope

Included:
* Workspace scanning and file indexing.
* YAML and JSON schema validation using AJV.
* Dynamic technology stack discovery.
* Automated WIR output creation.

---

# Non Goals

Excluded:
* Dynamic code mutation execution.
* Custom IDE interface plugins.
* AI chat reasoning pipelines.

---

# Architecture

The runtime executes in a local environment:

```
Workspace Folder
      │
      ▼
Reference Runtime (Index/Parser/Validator)
      │
      ▼
wir.json (Valid output)
```

---

# Components

### **Discovery module (`parser.js`)**
Recursively scans files and maps technology stacks.

### **Validation module (`validator.js`)**
Validates configuration maps and outputs reports against JSON schemas.

---

# Interfaces

Run directly from Node.js:

```bash
npm install
npm run test
```

---

# Constraints

* Local execution only: No network calls are executed during parsing.
* Strict validation: Fails build if generated WIR misses required schemas.

---

# Future Extensions

Future versions will pack the runtime into a standalone CLI binary executable on any operating system without Node dependencies.
