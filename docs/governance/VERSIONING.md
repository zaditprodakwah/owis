# Versioning Policy

OWIS adheres strictly to [Semantic Versioning 2.0.0](https://semver.org/). 

Given that OWIS is both a **Specification** and a set of **Runtime Packages**, versioning carries specific implications for both domains.

## Specification Versioning
- **Major (X.y.z)**: Incremented when the schema formats (`workspace.schema.json`, etc.) or the fundamental architecture rules change in a way that breaks existing consumers.
- **Minor (x.Y.z)**: Incremented when new additive concepts are introduced (e.g., new node types, new context limits) that do not break backward compatibility.
- **Patch (x.y.Z)**: Incremented for clarifications, typo fixes, or minor constraint adjustments in the specification that do not impact implementation logic.

## Runtime Packages Versioning
- **Major**: Breaking API changes in the SDK, CLI argument changes, or runtime extraction behaviors that invalidate previous OWIS states.
- **Minor**: New programmatic features, expanded adapters, or new linter rules.
- **Patch**: Bug fixes, performance improvements, security patches, or documentation updates.

All core packages (`runtime`, `cli`, `sdk`, `lint`, `graph`, `context`) are released in lockstep to ensure absolute consistency across the ecosystem.
