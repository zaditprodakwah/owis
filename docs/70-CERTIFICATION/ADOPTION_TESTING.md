# OWIS Adoption Testing

## Goal

Validate OWIS against external workspaces to ensure that the standard scales elegantly outside of its own internal repository architecture. The primary objective is to prove OWIS is adoptable, portable, and reliable.

## Test Categories

### A. Documentation Understanding
Can a new developer understand OWIS?
- Does the getting started guide effectively onboard engineers unfamiliar with the thesis?
- Are the core concepts (Source of Truth, WIR, Agent Constraints) easily digestible?

### B. Workspace Discovery
Can runtime analyze unknown repositories?
- Does the parser successfully execute against Node, Python, Go, and Next.js repositories?
- Does the parser fail gracefully when executing against an empty or malformed workspace?

### C. Schema Compatibility
Can external tools consume OWIS schemas?
- Are JSON Schema properties recognized correctly by external IDE validators?
- Can third-party validation libraries read `wir.schema.json` and validate reports without custom logic?

### D. Agent Compliance
Can external AI agents follow UARS?
- When presented with a UARS constraint block, do agents strictly adhere to minimal diffing?
- Do agents refuse to rewrite the full AST when tasked with localized edits?

### E. Integration
Can OWIS integrate into existing workflows?
- Are the CLI return codes standard (0 on success, >0 on failure)?
- Can the SDK programmatic module be imported and executed inside existing CI pipelines cleanly?
