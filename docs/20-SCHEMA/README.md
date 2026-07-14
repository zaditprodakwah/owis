---
id: owis-schemas
title: Specification Schemas
version: 1.0.0-draft
status: canonical
category: Schema
last_updated: 2026-07-15
---

# **SCHEMAS** <Badge type="tip" text="Canonical" />

---

# Overview

This section contains the official machine-readable schemas translating the OWIS specifications into JSON/YAML Schema structures.

---

# Purpose

The purpose of these schemas is to allow automated runtimes and validation scripts to verify that workspace manifests, configuration parameters, and intelligence reports comply with the specification format.

---

# Scope

Included:
* `workspace.schema.json`: Overall workspace setup.
* `uars.schema.json`: Runtime configuration parameters.
* `wir.schema.json`: Workspace Intelligence Report contents.
* `knowledge.schema.json`: Knowledge graph structures.
* `artifact.schema.json`: Document and code file metadata.
* `dependency.schema.json`: Edge relationships in the knowledge graph.

---

# Non Goals

Excluded:
* Dynamic data serialization formats.
* Database ORM configuration mappings.
* Specific testing script libraries.

---

# Architecture

The schemas are defined under JSON Schema Draft 07, ensuring interoperability across standard validator packages (e.g. `ajv` in Node.js, `jsonschema` in Python).

---

# Components

Each schema maps directly to one of the canonical entities defined in the Core Architecture Specification (CAS).

---

# Interfaces

Validators consume raw JSON/YAML configs and run verification checks against these schema interfaces.

---

# Constraints

* Schemas must strictly disallow undefined properties (`additionalProperties: false`) where applicable.
* Schemas must enforce critical validation parameters like type constraints and enums.

---

# Future Extensions

Future updates will translate the schemas into OpenAPI contracts for API-based integrations.
