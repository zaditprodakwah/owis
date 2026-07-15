# Deprecation Policy

To ensure the OWIS ecosystem can evolve without suddenly breaking dependent tooling, we follow a strict deprecation lifecycle.

## Lifecycle of a Deprecation
1. **Notice**: A feature (e.g., a CLI flag or SDK option) or a schema property is identified for removal.
2. **Deprecation Warning**: The feature is marked as `@deprecated` in the code, schema, and API documentation. Running the CLI or SDK with this feature may emit a console warning.
3. **Grace Period**: The deprecated feature remains fully functional for at least one full Minor release cycle (e.g., if deprecated in `0.2.0`, it will not be removed until at least `0.3.0` or `1.0.0`).
4. **Removal**: The feature is officially removed in the subsequent Major version release.

## Breaking Changes
We define a breaking change as any modification that forces a downstream user to modify their code or data to keep their integration working. Removals of deprecated features are breaking changes and will strictly occur during Major version bumps.
