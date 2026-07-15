# OWIS Public API Contracts — v0.2.0

This directory contains the authoritative public API contracts for all OWIS packages.

## Status

**FROZEN as of v0.2.0-rc.1.**

All surfaces documented here are part of the public compatibility contract.
Changing any of the following requires a new RFC and a major or minor version bump:

- Function names
- Parameter names, types, or order
- Return value shapes
- Error behavior and exit codes
- Artifact file names and schema structure

## Packages

| Package | NPM Name | Contract |
|---------|----------|----------|
| Runtime | `owis-runtime` | [runtime.md](./runtime.md) |
| CLI | `@prodakwah/owis` | [cli.md](./cli.md) |
| SDK | `@prodakwah/owis-sdk` | [sdk.md](./sdk.md) |
| Lint | `@prodakwah/owis-lint` | [lint.md](./lint.md) |
| Graph | `@prodakwah/owis-graph` | [graph.md](./graph.md) |
| Context | `@prodakwah/owis-context` | [context.md](./context.md) |

## Compatibility Guarantee

OWIS follows semantic versioning:

- **Patch releases** (`0.2.x`): Bug fixes only. No API changes.
- **Minor releases** (`0.x.0`): Additive API changes only. No breaking changes.
- **Major releases** (`x.0.0`): Breaking changes permitted. Require RFC and migration guide.

Artifact schemas (`wir.json`, `wir.graph.json`, `context.json`, `lint.json`) follow the same rules.

## Determinism Contract

Every generated artifact MUST be:

- Deterministic (same input → same output)
- Key-sorted (all JSON object keys sorted alphabetically)
- Stable-ordered (all JSON arrays in stable, predictable order)
- UTF-8 encoded
- LF line endings (`\n`)
- Path-separator normalized (`/` on all operating systems)

Any deviation from determinism is a **regression bug** regardless of platform.

## Change Process

To propose a change to a frozen API:

1. Open a new RFC in `docs/80-RFC/` using the RFC template.
2. Include a backward-compatibility analysis.
3. Obtain review approval.
4. Target the next appropriate release cycle.

See [RFC Process](../80-RFC/REVIEW_PROCESS.md) for details.
