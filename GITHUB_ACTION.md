# OWIS GitHub Action Blueprint

*Status: Design Only.*

## Overview

The OWIS GitHub Action provides a native, low-friction way to enforce workspace architecture rules directly in CI/CD pipelines. It wraps the `@prodakwah/owis-cli` to perform static analysis on pull requests and commits.

---

## Inputs

| Input | Description | Required | Default |
|-------|-------------|----------|---------|
| `command` | The OWIS CLI command to run (e.g., `lint`, `build`, `context`). | No | `lint` |
| `working-directory` | The directory containing `workspace.json`. | No | `.` |
| `config` | Path to a custom OWIS config file if not using default. | No | `workspace.json` |
| `fail-on-warning` | Exit with code 1 if warnings are detected. | No | `false` |
| `github-token` | Token used for posting PR comments. | No | `${{ github.token }}` |

## Outputs

| Output | Description |
|--------|-------------|
| `wir-path` | Absolute path to the generated `wir.json` artifact. |
| `context-path` | Absolute path to the generated `context.md` or `context.json`. |
| `violation-count` | Integer representing the number of architectural violations. |

---

## Recommended Workflow

```yaml
name: OWIS Architecture Check

on:
  pull_request:
    branches: [ main ]

jobs:
  validate-architecture:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 20
          
      - name: Run OWIS Lint
        uses: zaditprodakwah/owis-action@v1
        with:
          command: lint
          fail-on-warning: true
          
      - name: Upload WIR Artifact
        if: always()
        uses: actions/upload-artifact@v4
        with:
          name: owis-graph
          path: .owis/wir.json
```

---

## Architecture & Actions

The action is a **Composite Action** that handles:
1. Ensuring Node.js is available.
2. Installing `@prodakwah/owis-cli` via `npx` (to ensure it always runs the version compatible with the user's `package.json`, falling back to `latest`).
3. Executing the requested command.
4. Parsing the CLI exit codes.

## Failure Modes

- **Configuration Error (Code 2):** Missing or invalid `workspace.json`. The action fails immediately.
- **Lint Violations (Code 1):** The architectural rules were violated. The action fails the PR check.
- **Parse Error (Code 3):** The AST could not be generated due to severe syntax errors in the source code.

## Caching

To speed up analysis on large monorepos, the action will automatically cache the `.owis/.cache` directory based on the hash of the source files. 
- **Cache Key:** `owis-cache-${{ runner.os }}-${{ hashFiles('**/*.ts', '**/*.js') }}`

## Artifacts

When running the `build` or `context` commands, the action exposes the output files (WIR and context graphs) as outputs that can be piped into subsequent steps, such as `actions/upload-artifact` or injected into third-party LLM actions.

## Security

- The action does not upload code to any external servers.
- The `github-token` is strictly used for adding inline PR comments (if enabled in future versions).
- Executed entirely within the runner's ephemeral environment.

## Marketplace Metadata

- **Name:** OWIS Architecture Linter
- **Description:** Enforce workspace boundaries and generate architectural context for your repository.
- **Categories:** Code Quality, Utilities, Continuous Integration
- **Color:** Purple
- **Icon:** Git-branch
