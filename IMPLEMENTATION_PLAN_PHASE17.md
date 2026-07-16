# IMPLEMENTATION_PLAN_PHASE17.md

## Milestone 1 – Documentation Architecture

- **Objectives:** Scaffold semantic documentation directories, produce core ecosystem docs (ECOSYSTEM.md, INTEGRATIONS.md, EXAMPLES.md, SDK_STRATEGY.md, MCP_SPEC.md, GITHUB_ACTION.md, VSCODE_EXTENSION.md, TEMPLATE_STRATEGY.md, ADOPTION_GUIDE.md).
- **Deliverables:** All markdown files listed above; empty `docs/` sub‑folders with placeholder `README.md` files.
- **Dependencies:** None (no runtime changes).
- **Acceptance Criteria:** `npm run docs:build` succeeds; no broken links.

## Milestone 2 – Example Repositories

- **Objectives:** Define and publish example repository descriptions in `EXAMPLES.md`.
- **Deliverables:** Completed `EXAMPLES.md` with six example scenarios.
- **Acceptance Criteria:** All example URLs (to be added later) are documented; no code changes required.

## Milestone 3 – Template Strategy

- **Objectives:** Draft `TEMPLATE_STRATEGY.md` with eight starter templates.
- **Deliverables:** Completed markdown file describing audience, features, maintenance, upgrade strategy.
- **Acceptance Criteria:** Templates are listed and described; ready for future repository creation.

## Milestone 4 – GitHub Action Blueprint

- **Objectives:** Produce `GITHUB_ACTION.md` design doc, including inputs, outputs, workflow example, caching strategy, failure modes.
- **Deliverables:** Blueprint ready for implementation in a later phase.
- **Acceptance Criteria:** Blueprint passes peer review; CI workflow example validates.

## Milestone 5 – VS Code Extension Blueprint

- **Objectives:** Write `VSCODE_EXTENSION.md` covering feature set, performance budget, telemetry policy, and roadmap.
- **Deliverables:** Completed design doc.
- **Acceptance Criteria:** Aligns with LSP constraints; documented performance targets.

## Milestone 6 – MCP Blueprint

- **Objectives:** Define MCP protocol spec in `MCP_SPEC.md` – resources, tools, prompts, security, rate limits.
- **Deliverables:** Full design‑only spec.
- **Acceptance Criteria:** Reviewed by security stakeholder; matches existing OWIS data model.

## Milestone 7 – Registry Readiness Assessment

- **Objectives:** Produce an assessment of readiness for Phase 18 Registry.
- **Deliverables:** Checklist covering package naming, ownership, extension interfaces, provider contracts, discovery model, version negotiation, dependency graph, metadata.
- **Acceptance Criteria:** All items marked *Complete* or *Pending* with blockers identified.

## Milestone 8 – Certification Readiness Assessment

- **Objectives:** Draft assessment for Phase 19 Certification.
- **Deliverables:** Checklist covering compliance levels, conformance suites, golden fixtures, compatibility testing, badge program, workflow.
- **Acceptance Criteria:** No *Critical* blockers; pending items are tracked.

---

## Public API Stability Matrix

| API Surface | Level | Comments |
|------------|-------|----------|
| **Runtime API** | Stable | Guarantees backwards compatibility across major releases.
| **CLI** | Stable | Semantic versioning; deprecation warnings emitted.
| **SDK (Node)** | Supported | Minor version bumps may add methods; breaking changes only on major.
| **SDK (Python)** | Supported | Planned for v0.2.0; will follow same policy as Node.
| **Graph Engine** | Stable | Core graph format (`wir.json`) versioned.
| **Context Engine** | Stable | `context.json` and `context.md` formats stable.
| **Lint Engine** | Supported | New lint rules can be added without breaking.
| **JSON Schemas** | Stable | Published under `schemas/`; versioned.
| **WIR** | Stable | Schema version `0.2.0` locked.
| **Context JSON** | Stable | Same versioning as WIR.
| **Context Markdown** | Stable | Token‑optimized format; stable.
| **Graph JSON** | Stable | Mirrors WIR structure.
| **Package Metadata** | Supported | `package.json` fields may evolve.
| **CLI Exit Codes** | Stable | 0 = success, 1 = lint violations, 2 = config error, 3 = parse error.
| **Documentation Contracts** | Supported | Docs may add new sections; existing URLs remain.

---

## Registry Readiness Checklist (Phase 18 Prerequisites)

- [x] **Package Naming Convention** – `@prodakwah/owis-*` agreed.
- [x] **Ownership Model** – Each package lists `maintainers` in `package.json`.
- [ ] **Extension Interfaces** – Defined in `Extension Model` section of `ECOSYSTEM.md`.
- [ ] **Provider Contracts** – Formal JSON schema for providers (to be created).
- [ ] **Plugin Manifest (`owis-plugin.json`)** – Spec drafted.
- [ ] **Discovery Model** – Registry API design pending.
- [ ] **Version Negotiation** – Semantic version ranges defined.
- [ ] **Dependency Graph Export** – Already available via `wir.json`.
- [ ] **Metadata Requirements** – Required fields listed in `MCP_SPEC.md`.

*Blockers:* Extension Interfaces, Provider Contracts, Plugin Manifest, Discovery Model need design before Phase 18 can start.

---

## Certification Readiness Checklist (Phase 19 Prerequisites)

- [x] **Compliance Levels Defined** – `Stable`, `Supported`, `Experimental`, `Internal`.
- [ ] **Conformance Test Suite** – Draft in `certification/` (future).
- [ ] **Golden Fixtures** – Sample `wir.json` / `context.json` for each version.
- [ ] **Compatibility Testing** – Cross‑SDK validation scripts pending.
- [ ] **Badge Program** – Specification not yet drafted.
- [ ] **Certification Workflow** – Review process to be defined.

*Blockers:* Test suite, fixtures, badge program need implementation.

---

## Exit Criteria (Phase 17)

- All documentation files created and verified.
- `docs/` scaffold exists with placeholder `README.md`s.
- Public API Stability Matrix completed and reviewed.
- Registry and Certification readiness checklists documented, with blockers clearly identified.
- No runtime, schema, or code changes were made.
- Documentation build passes (`npm run build` or `npm run docs:build`).

*If any blocker remains, Phase 18 must be delayed until resolved.*
