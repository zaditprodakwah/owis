---
id: owis-registry-spec
title: Registry Specification
version: 0.1.0
status: canonical
category: Registry
last_updated: 2026-07-15
---

# **REGISTRY SPECIFICATION** <Badge type="tip" text="Canonical" />

---

# Overview

The OWIS Registry is a catalog specification that maps compliant schemas, reference runtimes, CLI wrappers, and integration plugins.

---

# Purpose

The purpose of the registry is to provide developers, automated integration packages, and AI IDE engines with a unified discovery system for all available OWIS adapters and compliant software extensions.

---

# Scope

Included:
* Package and extension registration layouts.
* Discovery endpoint schemas.
* Package checksum validation requirements.

---

# Non Goals

Excluded:
* Dynamic repository hosting services.
* Core package installation scripts.

---

# Architecture

The registry acts as a metadata service:

```
Developer / AI IDE
        │
        ▼
Registry Index API (Discovery)
        │
        ▼
Compliant Parsers, CLI Plugins, and SDKs Catalog
```

---

# Components

### **Package Manifest**
Contains package identifier, version, schemas, runtime requirements, and checksums.

### **Index Query API**
Handles registry queries for compatible packages and version maps.

---

# Interfaces

Access options:

* Query index (JSON format):
  ```json
  GET /packages
  ```
* Fetch specific plugin metadata:
  ```json
  GET /packages/owis-cli-node
  ```

---

# Constraints

* Registry packages must provide proof of certification compliance.
* Packages must declare their checksum to secure integrity during installations.

---

# Future Extensions

Future implementations will include decentralized registry indices to support peer-to-peer extension distribution.
