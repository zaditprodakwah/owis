# Release Governance

This document establishes the official release rules, versioning policies, and deprecation protocols for the Open Workspace Intelligence Specification (OWIS) project.

---

## Versioning Policy

OWIS follows a unified SemVer-like versioning scheme to maintain consistency between specifications, schemas, reference runtime, CLI, and SDK packages.

* **Specification Version**: `0.1.0` (Draft Canonical / Public Baseline)
* **Documentation Version**: `0.1.0`
* **Runtime Version**: `0.1.0`
* **CLI Version**: `0.1.0`
* **SDK Version**: `0.1.0`

---

## Release Requirements

Before any release branch is merged into `main` and tagged, the following verification pipeline MUST pass with a zero-failure result:

1. **Schema Validation**: All JSON/YAML schemas under `docs/20-SCHEMA/` must pass validation checks.
2. **Runtime Verification**: Reference runtime tests must pass successfully.
3. **CLI Integration**: CLI executable commands must run successfully on test workspaces.
4. **SDK Verification**: SDK programmatic imports and typing mappings must execute without error.
5. **Documentation Portal Compile**: The VitePress build must compile with zero warnings and zero broken links.

---

## Breaking Changes

To maintain ecosystem stability, breaking changes are classified and governed by these rules:

* **Schema Breaking Changes**: Any change that modifies, removes, or tightens existing required properties in schemas requires a minor version bump (e.g. `0.1.0` to `0.2.0`) during early draft phases, and a major version bump in production.
* **Runtime / API Breaking Changes**: Any changes to exported function signatures in the SDK or parameters in the CLI must be documented clearly in the `CHANGELOG.md` and accompanied by a corresponding version bump.

---

## Deprecation Policy

* Deprecated specifications, schemas, or programmatic methods must be marked with a `Deprecated` badge in the documentation.
* Deprecated assets will be maintained for at least one minor release cycle before final removal to allow downstream implementers to adapt.
