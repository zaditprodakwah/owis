# Documentation Governance

## Purpose

This document establishes the official governance baseline and change-control rules for the Open Workspace Intelligence Specification (OWIS) documentation. It ensures that all specifications remain canonical, structured, and consistent across all updates.

---

## Canonical Source of Truth

The Markdown files committed in the repository are the canonical Source of Truth. The VitePress documentation portal is a static renderer and MUST NOT duplicate, modify, or contain standalone specification concepts.

---

## Document Classification

All files under `docs/` are classified according to the Document Architecture Specification (DAS):

* **`00-CONSTITUTION`**: Project philosophy, vision, positioning, and immutable principles.
* **`01-FOUNDATION`**: Architectural foundations, core schemas ontology, and reference pipelines.
* **`10-SPEC`**: Technical specifications defining operational runtime contracts and schemas.

### Future Classifications:
* **`20-SCHEMA`**: Machine-readable schemas (JSON/YAML Schema).
* **`30-RUNTIME`**: Reference engines and parsers.
* **`40-CLI`**: Command-line developer tools.
* **`50-SDK`**: Developer integration kits.
* **`60-REGISTRY`**: Registry specifications.
* **`70-CERTIFICATION`**: Agent compliance testing.

---

## Document Lifecycle

All specification files progress through four sequential lifecycle stages:

```
Draft → Review → Canonical → Deprecated
```

1. **Draft**: Initial proposal or revision in progress.
2. **Review**: Completed draft open for community feedback and maintainer audit.
3. **Canonical**: Merged and locked specification serving as the active Source of Truth.
4. **Deprecated**: Superseded or retired specifications.

---

## Change Rules

Modifications to the specifications or repository architecture must comply with the following rules:
* Any change to system architecture or conceptual boundaries requires a corresponding update to the specifications.
* Update documentation first before modifying schemas, runtime libraries, or test suites.
* All updates must be recorded in the `CHANGELOG.md` under the active specification version.
* No changes should introduce internal conceptual contradictions.
