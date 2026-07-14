# OWIS v0.1.0 Release Checklist

This checklist tracks validation tasks required before the public release of OWIS v0.1.0.

---

## Documentation
- [ ] Portal builds successfully via VitePress (`npm run validate` / `npx vitepress build website`).
- [ ] `llms.txt` navigation profile is valid and up-to-date.
- [ ] All cross-document markdown links resolve cleanly with zero broken links.

---

## Specification
- [ ] All JSON schemas (`docs/20-SCHEMA/`) are valid and parse successfully.
- [ ] Specifications are aligned to version `0.1.0`.

---

## Runtime
- [ ] Reference parser detects directories, stack, and SoT correctly.
- [ ] Reference validator checks files against JSON schemas successfully.
- [ ] Runtime integration tests pass.

---

## Tooling
- [ ] CLI runs successfully and accepts options (`-o`, `--help`, `--version`).
- [ ] SDK exports `parse` and `check` functions, and TypeScript declaration `index.d.ts` compiles successfully.

---

## Governance
- [ ] Project LICENSE is confirmed (MIT License).
- [ ] `CHANGELOG.md` is updated with `v0.1.0` releases.
- [ ] `RELEASE_GOVERNANCE.md` is active and locked.
