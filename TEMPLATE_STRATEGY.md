# Template Strategy

To drive adoption, developers must be able to bootstrap an OWIS-compliant project in under 5 minutes. The OWIS project will provide a suite of starter repositories (templates) hosted under the official GitHub organization.

---

## Starter Templates

### 1. Minimal
- **Audience:** Developers testing OWIS or creating small scripts.
- **Features:** A basic `package.json`, one `index.ts`, and a boilerplate `workspace.json`.
- **Maintenance Policy:** Kept perpetually up-to-date with `latest` via automated Dependabot PRs.
- **Upgrade Strategy:** N/A (too simple to require migration scripts).

### 2. OSS Library
- **Audience:** Open-source maintainers building NPM/PyPI packages.
- **Features:** Pre-configured with OWIS GitHub Actions to run linting on PRs. Semantic Release integration.
- **Maintenance Policy:** Maintained by the Core Team.

### 3. CLI
- **Audience:** Developers building command-line utilities.
- **Features:** Pre-configured Commander/Yargs setup with an OWIS boundary enforcing strict separation between CLI parsing and core logic.
- **Maintenance Policy:** Maintained by the Core Team.

### 4. SDK
- **Audience:** Teams building API clients or SDK wrappers.
- **Features:** Strict architectural constraints ensuring that external dependencies are isolated to specific network-layer modules.
- **Maintenance Policy:** Maintained by the Core Team.

### 5. Next.js
- **Audience:** Full-stack web developers.
- **Features:** A pre-configured Next.js App Router project where OWIS maps boundaries between Server Actions, Client Components, and shared utilities.
- **Maintenance Policy:** Community-driven; updated shortly after major Next.js releases.

### 6. Enterprise Monorepo
- **Audience:** Enterprise teams managing multiple packages.
- **Features:** Uses Nx or Turborepo. Demonstrates how `workspace.json` cascades across package boundaries and enforces cross-package governance.
- **Maintenance Policy:** Core Team. Strict integration testing against the latest Nx/Turbo releases.

### 7. AI Agent
- **Audience:** AI researchers and agent developers.
- **Features:** Integrates `@prodakwah/owis-context` natively to feed the workspace graph directly into LangChain or OpenAI clients.
- **Maintenance Policy:** Maintained by Core Team.

### 8. Documentation
- **Audience:** Technical writers.
- **Features:** A VitePress template that uses the OWIS context engine to auto-generate architectural diagrams and API references on build.
- **Maintenance Policy:** Community-driven.

---

## Lifecycle & Maintenance

All official templates must adhere to the following lifecycle:

1. **Bootstrap:** Created using the latest stable OWIS CLI release.
2. **CI Verification:** Must contain a `.github/workflows/ci.yml` that runs `owis lint` and `owis build`.
3. **Deprecation:** If a framework (e.g., an older version of Next.js) is deprecated, the template is archived with a clear notice directing users to the modern equivalent.
