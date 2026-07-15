# Monorepo Workspace

A monorepo workspace used as a golden fixture for OWIS testing.

## Purpose

This fixture represents a monorepo containing multiple packages (core, cli, sdk).
It is used to verify deterministic WIR generation for multi-package workspaces.

## Structure

- `packages/core/` — Core library
- `packages/cli/` — CLI tool
- `packages/sdk/` — SDK
- `docs/` — Monorepo documentation
- `package.json` — Root NPM workspace manifest
- `workspace.json` — OWIS workspace configuration
