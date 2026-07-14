---
id: owis-sdk-spec
title: SDK Integration Specification
version: 1.0.0-draft
status: canonical
category: SDK
last_updated: 2026-07-15
---

# **SDK INTEGRATION SPECIFICATION** <Badge type="tip" text="Canonical" />

---

# Overview

The OWIS SDK is a programmatic developer integration library written in Node.js, providing type-safe bindings to load, parse, and validate workspace intelligence configurations and reports.

---

# Purpose

The purpose of the SDK is to enable external developer engines, custom CLI wrappers, and autonomous AI agents to easily parse local workspace contexts and integrate OWIS verification natively into their software stacks.

---

# Scope

Included:
* Reusable Node.js API exports (`parse`, `check`).
* TypeScript definition mappings (`index.d.ts`).
* Validation interfaces using standard schema catalogs.

---

# Non Goals

Excluded:
* Specific command line interface wrappers.
* Dynamic web browser parsing adapters.

---

# Architecture

The SDK packages parsing and validation modules into a clean programmatic layer:

```
Developer Script (JS / TS)
        │
        ▼
Programmatic SDK API (parse / check)
        │
        ▼
OWIS Ingestion & Schema Validations
```

---

# Components

### **Programmatic Parser (`parse()`)**
Accepts a workspace path and extracts tech stacks, file metrics, and metadata.

### **Programmatic Validator (`check()`)**
Validates raw payloads against the schemas using AJV.

---

# Interfaces

Import natively:

```javascript
const { parse, check } = require('owis-sdk');

const wir = parse('./my-workspace');
const result = check('wir', wir);

if (result.valid) {
  console.log('Valid workspace!');
}
```

---

# Constraints

* The SDK is dependency-free by design, requiring only standard Node libraries and validation configurations.
* Autocomplete requires an editor that supports TypeScript `.d.ts` declaration maps.

---

# Future Extensions

Future implementations will introduce Python and Rust language ports to extend integration capabilities across multi-language frameworks.
