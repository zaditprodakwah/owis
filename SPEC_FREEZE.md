# OWIS Specification Freeze — v0.2.0-rc.1

**Effective Date:** 2026-07-15  
**Status:** FROZEN  
**Release Target:** `v0.2.0`

---

## What Is Frozen

As of `v0.2.0-rc.1`, the following surfaces are officially frozen. No changes may be made to these surfaces without following the [Change Process](#change-process).

### 1. Public API Contracts

All exported functions across all OWIS packages are frozen. See `docs/90-API/` for the full contract.

| Package | Entry Point | Contract File |
|---------|-------------|---------------|
| `owis-runtime` | `src/index.js` + `src/parser.js` + `src/validator.js` | [docs/90-API/runtime.md](docs/90-API/runtime.md) |
| `@prodakwah/owis` (CLI) | `bin/owis.js` | [docs/90-API/cli.md](docs/90-API/cli.md) |
| `@prodakwah/owis-sdk` | `src/index.js` | [docs/90-API/sdk.md](docs/90-API/sdk.md) |
| `@prodakwah/owis-lint` | `index.js` | [docs/90-API/lint.md](docs/90-API/lint.md) |
| `@prodakwah/owis-graph` | `index.js` | [docs/90-API/graph.md](docs/90-API/graph.md) |
| `@prodakwah/owis-context` | `index.js` | [docs/90-API/context.md](docs/90-API/context.md) |

**Frozen elements per package:**
- Function names
- Parameter names, types, and order
- Return value shapes
- Error behavior and thrown error types
- Exit codes (CLI)

### 2. JSON Schemas

The following JSON schemas are frozen and must not be modified:

| Schema File | Purpose |
|-------------|---------|
| `docs/20-SCHEMA/wir.schema.json` | Workspace Intelligence Report |
| `docs/20-SCHEMA/workspace.schema.json` | Workspace configuration |
| `docs/20-SCHEMA/uars.schema.json` | Universal Agent Runtime Specification |
| `docs/20-SCHEMA/artifact.schema.json` | Artifact descriptor |
| `docs/20-SCHEMA/dependency.schema.json` | Dependency descriptor |
| `docs/20-SCHEMA/knowledge.schema.json` | Knowledge domain |
| `context/schema.json` | Context payload schema |

### 3. Artifact Formats

The following generated artifact formats are frozen:

| Artifact | Schema / Version |
|----------|-----------------|
| `wir.json` | `wir.schema.json` (v0.1.0+) |
| `wir.graph.json` | Graph serialization v0.2.0 |
| `context.json` | `context/schema.json` (contextVersion: "0.2.0") |
| `context.md` | Markdown template (informational format) |
| `lint.json` | LintResult shape (see lint API contract) |

### 4. CLI Command Surface

The following CLI commands, flags, and exit code semantics are frozen:

| Command | Exit 0 | Exit 1 |
|---------|--------|--------|
| `owis scan <path>` | WIR valid and files written | Schema invalid or write error |
| `owis lint <path>` | No ERROR diagnostics | ERROR diagnostics found |
| `owis context <path>` | Context generated and validated | Validation failure or write error |
| `owis --help` / `-h` | Always | — |
| `owis --version` / `-v` | Always | — |

### 5. Golden Fixtures

The fixture files in `fixtures/golden/` are canonical specification artifacts.

- Committed to Git and reviewed like specification documents.
- Regenerated only through `npm run fixtures:update`.
- Every regeneration must be accompanied by a `git diff` review.
- CI compares against committed fixtures. Unexpected differences fail CI.

### 6. Determinism Contract

Every generated artifact must be:

- **Deterministic**: Same input → byte-for-byte identical output (modulo timestamps).
- **Key-sorted**: All JSON object keys sorted alphabetically.
- **Stable-ordered**: All JSON arrays in stable, predictable order.
- **UTF-8 encoded** with LF line endings (`\n`).
- **Path-separator normalized**: Forward slashes (`/`) on all operating systems.

Deviation from determinism is a regression bug regardless of platform.

---

## What Is NOT Frozen

The following elements may change in patch or minor releases without an RFC:

- CLI stdout format (prose, emojis, spacing) — informational only
- Diagnostic message text (not IDs or severity levels)
- Performance benchmark results and thresholds
- Documentation prose content (not API table signatures)
- Internal implementation details (algorithms, class internals)
- Context sanitizer budget limit values (`context/limits.js`)

---

## Change Process

To change any frozen surface:

1. **Open an RFC** in `docs/80-RFC/` using the RFC template.
2. **Specify the motivation** and include a backward-compatibility analysis.
3. **Obtain review approval** from at least one maintainer.
4. **Target the appropriate release**:
   - Breaking changes → major release (e.g., `v1.0.0`)
   - Additive changes → minor release (e.g., `v0.3.0`)
   - Bug fixes only → patch release (e.g., `v0.2.1`)
5. **Add a compatibility note** to `CHANGELOG.md`.

See [RFC Review Process](docs/80-RFC/REVIEW_PROCESS.md) for details.

---

## Release Candidate Freeze Policy

While the repository is in Release Candidate Freeze (`v0.2.0-rc.1` to `v0.2.0`):

- ✅ Verified bug fixes are permitted
- ✅ Documentation corrections are permitted
- ✅ Release-critical security patches are permitted
- ❌ New features are not permitted
- ❌ Breaking changes are not permitted
- ❌ New public API additions are not permitted (wait for v0.3.0)

All changes during RC Freeze require explicit maintainer approval and must not change any frozen API surface.
