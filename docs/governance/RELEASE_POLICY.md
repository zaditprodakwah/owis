# Release Policy

The OWIS project employs a structured release process to ensure stability, determinism, and seamless integration for ecosystem tooling.

## Release Cadence
- **Major Releases (x.0.0)**: Rare. Occur only when breaking specification changes are unavoidable. Requires extensive RFC review and community consensus.
- **Minor Releases (0.x.0)**: Predictable. Introduce new additive features (e.g., new node types, context adapters) without breaking backward compatibility.
- **Patch Releases (0.0.x)**: Frequent. Include bug fixes, security patches, and performance improvements.

## Pre-Release Stages
1. **Alpha (`-alpha.x`)**: Initial implementation of RFCs. APIs may change. Not for production use.
2. **Beta (`-beta.x`)**: Feature-complete. Used for ecosystem integration testing.
3. **Release Candidate (`-rc.x`)**: Specification and code freeze. Only critical security or regression bugs are fixed.
4. **Stable**: Production-ready release.

## Release Process
1. Validate against the full compliance suite (`npm run validate`).
2. Generate deterministic artifacts and SHA checksums.
3. Push Git tags and create a GitHub Release with detailed Release Notes.
4. Publish packages to the NPM registry.
5. Deploy updated specification documentation.
