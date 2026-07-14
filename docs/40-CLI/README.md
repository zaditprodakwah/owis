---
id: owis-cli-spec
title: CLI Tooling Specification
version: 1.0.0-draft
status: canonical
category: CLI
last_updated: 2026-07-15
---

# **CLI TOOLING SPECIFICATION** <Badge type="tip" text="Canonical" />

---

# Overview

The OWIS CLI is a command-line interface wrapper for the OWIS Reference Runtime parser and validation engines.

---

# Purpose

The purpose of the CLI is to allow developers to validate project structures and generate WIR documents directly from their terminal or inside CI/CD automation pipelines.

---

# Scope

Included:
* Terminal executable bindings.
* Command argument parsing (`-o`, `--output`, `-h`, `--help`, `-v`, `--version`).
* Standard output formatting and error reporting.

---

# Non Goals

Excluded:
* Dynamic repository mutations.
* Interactive text editing shells.

---

# Architecture

The CLI acts as a bridge between the command line environment and the reference runtime:

```
CLI Execution Command
        │
        ▼
CLI Wrapper (bin/owis.js)
        │
        ▼
Reference Runtime Engine
```

---

# Components

### **Argument Parser**
Resolves options and flags.

### **Orkestrator**
Passes inputs to the parser and validator modules and handles file writing.

---

# Interfaces

Run options:

* Display help:
  ```bash
  owis --help
  ```
* Run on a target workspace and output report:
  ```bash
  owis /path/to/project -o /custom/path/wir.json
  ```

---

# Constraints

* The CLI requires Node.js v20+ to execute.
* Outputs must strictly validate against the JSON schemas before saving.

---

# Future Extensions

Future packaging will build native platform executable binaries for macOS, Linux, and Windows using compilation packages (e.g. `pkg`).
