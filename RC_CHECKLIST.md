# Release Candidate Checklist — v0.2.0-rc.1

This checklist must be fully completed before tagging `v0.2.0-rc.1`.

All CI gates must be green across the full matrix:
- **OS**: Ubuntu, Windows, macOS
- **Node.js**: 20.x (LTS), 22.x (Current)

---

## Release Gates

### 1. Schema

- [ ] `website/scripts/validate-json.js` passes without errors
- [ ] All schemas in `docs/20-SCHEMA/` are valid JSON
- [ ] `context/schema.json` is valid JSON
- [ ] No schema files modified since last freeze review

### 2. Runtime

- [ ] `npm test` in `runtime/` passes (all test files in `runtime/tests/`)
- [ ] `parseWorkspace()` returns a valid WIR for all golden fixtures
- [ ] `validate()` correctly validates WIR, workspace, and other schemas
- [ ] No `process.exit()` calls in the main module (only in scripts)

### 3. CLI

- [ ] `npm test` in `cli/` passes
- [ ] `owis --help` exits 0
- [ ] `owis --version` exits 0 and prints a version string
- [ ] `owis scan <path>` exits 0 for a valid workspace
- [ ] `owis scan <path>` generates `wir.json` and `wir.graph.json`
- [ ] `owis lint <path>` exits 0 or 1 (never crashes)
- [ ] `owis context <path>` generates `context.json` and `context.md`
- [ ] `--output` flag correctly redirects output path

### 4. SDK

- [ ] `npm test` in `sdk/` passes
- [ ] `parse()` is exported and functional
- [ ] `check()` is exported and functional
- [ ] All v0.2 exports present: `parseGraph`, `analyzeGraph`, `serializeGraph`, `buildContext`, `sanitizeContext`, `validateContext`, `serializeContext`, `loadContext`, `lint`
- [ ] No internal modules accidentally importable through `exports` field

### 5. Lint

- [ ] `npm test` in `lint/` passes
- [ ] `engine.lint()` accepts `(context, wir)` and returns `LintResult`
- [ ] `registry.register()` accepts custom rules
- [ ] `formatter.formatCLI()` returns a string
- [ ] `loadDefaultRules()` loads all built-in rules without error
- [ ] All built-in rule IDs remain stable

### 6. Graph

- [ ] `npm test` in `graph/` passes
- [ ] `parseGraph(workspaceRoot, wir)` returns a Graph
- [ ] `analyzeGraph(graph)` returns analysis with `counts.nodes` and `counts.edges`
- [ ] `serializeGraph(graph)` returns `{ version, nodes, edges }`
- [ ] Serialized output is deterministic (sorted nodes and edges)
- [ ] All node IDs use forward-slash separators on all platforms

### 7. Context

- [ ] `npm test` in `context/` passes
- [ ] `buildContext(payloads, sourcesMap)` returns a raw context
- [ ] `sanitizeContext(context)` returns `{ context, diagnostics }`
- [ ] `validateContext(context)` validates against `context/schema.json`
- [ ] `serializeContext(context, 'json')` returns deterministic JSON
- [ ] `serializeContext(context, 'markdown')` returns Markdown
- [ ] `loadContext(filepath)` reads and parses `context.json`
- [ ] `context._truncated` is `true` only when budget limits apply

### 8. Compatibility

- [ ] `node --test compatibility/*.test.js` passes all tests
- [ ] v0.1 golden fixture (`fixtures/golden/simple/wir.json`) validates against v0.2 schema
- [ ] v0.2 graph generator processes v0.1 WIR without error
- [ ] v0.2 context builder processes v0.1 WIR and graph without error
- [ ] All v0.1 SDK API methods (`parse`, `check`) work without modification
- [ ] All v0.1 CLI commands (`scan`, `lint`, `context`, flags) work without modification

### 9. Snapshots

- [ ] `node --test tests/snapshots/*.test.js` passes all tests
- [ ] All 4 fixtures (`simple`, `medium`, `large`, `monorepo`) have committed artifacts
- [ ] `wir.json` keys are sorted in all fixtures
- [ ] `wir.graph.json` has `version`, `nodes`, `edges` in all fixtures
- [ ] All edge `from`/`to` references point to existing node IDs
- [ ] No duplicate node IDs in any fixture
- [ ] All node path metadata uses forward-slash separators
- [ ] `context.json` has `contextVersion: "0.2.0"` in all fixtures
- [ ] `context._truncated` is `false` in all fixtures

### 10. Security

- [ ] `node --test security/fuzz/tests/*.test.js` passes all tests
- [ ] Symlink recursion: `parseWorkspace` completes without hanging
- [ ] Deep directory trees: `parseWorkspace` completes without stack overflow
- [ ] Malformed UTF-8: `sanitizeContext` does not throw
- [ ] Invalid JSON: `parseWorkspace` throws a catchable error (not crash)
- [ ] Oversized metadata (500 KB): sanitizer truncates and marks `_truncated: true`
- [ ] Prompt injection ("ignore all previous instructions"): metadata cleared and redacted
- [ ] Prompt injection ("you are a"): metadata cleared and redacted
- [ ] Prompt injection ("bypass constraints"): metadata cleared and redacted
- [ ] ANSI escape sequences: sanitizer does not throw
- [ ] Hidden dotfiles (`.env`, `.hidden`): `parseWorkspace` does not crash
- [ ] Binary files (`.png`, `.bin`): `parseWorkspace` does not crash
- [ ] Zip-bomb simulation (5 MB string): sanitizer truncates metadata below 1 MB
- [ ] Path traversal (`../../../etc/passwd`): sanitizer does not throw
- [ ] Path traversal workspace: `parseWorkspace` throws descriptive error for nonexistent paths
- [ ] Cyclic graph: `analyzeGraph` completes without hanging

### 11. Documentation

- [ ] `node scripts/validate-docs.js` passes with 0 errors
- [ ] All relative links in `docs/90-API/*.md` resolve to existing files
- [ ] No empty `.md` files in `docs/`
- [ ] All 7 API contract files present and non-empty:
  - [ ] `docs/90-API/README.md`
  - [ ] `docs/90-API/runtime.md`
  - [ ] `docs/90-API/cli.md`
  - [ ] `docs/90-API/sdk.md`
  - [ ] `docs/90-API/lint.md`
  - [ ] `docs/90-API/graph.md`
  - [ ] `docs/90-API/context.md`

### 12. Build

- [ ] `npx vitepress build website` completes without errors
- [ ] Build output present in `website/.vitepress/dist/`

### 13. CI Matrix

- [ ] CI passes on `ubuntu-latest` + Node 20.x
- [ ] CI passes on `ubuntu-latest` + Node 22.x
- [ ] CI passes on `windows-latest` + Node 20.x
- [ ] CI passes on `windows-latest` + Node 22.x
- [ ] CI passes on `macos-latest` + Node 20.x
- [ ] CI passes on `macos-latest` + Node 22.x
- [ ] Performance benchmark job runs on `ubuntu-latest` (informational, non-blocking)
- [ ] Benchmark results uploaded as CI artifact

---

## Package Metadata

- [ ] All package versions are `0.2.0-rc.1`
- [ ] All packages have pinned dependency versions (no `^` or `~` ranges)
- [ ] All packages have `engines: { node: ">=20.0.0" }`
- [ ] All packages have `repository`, `bugs`, `homepage`, `funding` fields
- [ ] All packages export only public APIs through `exports` field
- [ ] All packages include `README.md`, `LICENSE`, `CHANGELOG.md`, `SECURITY.md`, `CONTRIBUTING.md`, `CODEOWNERS`

---

## Specification Artifacts

- [ ] `SPEC_FREEZE.md` is present and up to date
- [ ] `RC_CHECKLIST.md` is present and all items verified
- [ ] `CHANGELOG.md` has an entry for `v0.2.0-rc.1`
- [ ] All golden fixtures are committed to Git

---

## Tagging

Once all checklist items are verified:

```sh
git tag -a v0.2.0-rc.1 -m "Release Candidate 1 — OWIS v0.2.0"
git push origin v0.2.0-rc.1
```

After tagging, the repository enters **Release Candidate Freeze**. Only verified bug fixes,
documentation corrections, and release-critical patches are permitted until `v0.2.0` is released.
