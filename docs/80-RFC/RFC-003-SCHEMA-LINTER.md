# RFC-003: OWIS Schema Linter

## Status

Draft


## Problem Statement

Currently, OWIS generates metadata (WIR) and validates JSON schemas, but it does not actively audit the quality of the workspace architecture against best practices. Workspaces can pass schema validation but still possess missing metadata, undocumented components, or structural inconsistencies that hinder AI comprehension.

## Motivation

Add architecture quality validation via a future CLI command:
```bash
owis lint
```
This tool will critique the workspace and enforce higher standards of documentation and structural consistency, scoring the architecture out of 100.

## Proposed Solution

Introduce a linter module to `owis-runtime` and expose it via the CLI.
Capabilities to check:
* missing metadata
* invalid structure
* naming violations
* undocumented components
* schema inconsistencies

Output format example:
```
OWIS Architecture Lint

✓ Structure valid

Warnings:
! Missing component documentation
! Undefined dependency relationship

Score: 92/100
```

## Architecture Impact

- `owis-runtime` will gain a new `Linter` class that takes a generated `WIR` and cross-references it against defined quality rules.
- The CLI will add a new `owis lint` command flag.

## Backward Compatibility

- Preserves v0.1.0 compatibility. Linting is an optional, non-destructive read-only operation that does not modify the `wir.schema.json`.

## Security Considerations

- None major. As a read-only operation, it poses low security risks, assuming the input WIR generation is already secured against directory traversal or symlink attacks.

## Implementation Plan

Do not implement yet.

## Open Questions

- Should the linting rules be configurable via a `.owisrc` or `owis.config.js` file?
- What is the scoring formula?
