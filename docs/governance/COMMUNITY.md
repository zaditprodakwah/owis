# Community Workflow

The OWIS community is driven by collaboration, clear communication, and open specifications. This document outlines how to participate effectively in the OWIS ecosystem.

## Discussions
For Q&A, ideas, and general communication, please use [GitHub Discussions](https://github.com/zaditprodakwah/owis/discussions).
- **Q&A**: Ask questions about using the CLI, SDK, or runtime.
- **Ideas**: Brainstorm new features before writing a formal RFC.
- **Show and Tell**: Share how you are using OWIS in your projects.

## RFC Process
Major changes, architectural decisions, and specification additions must go through the Request for Comments (RFC) process.
1. Draft an RFC using the template in `docs/80-RFC/RFC_TEMPLATE.md`.
2. Submit a Pull Request to the `docs/80-RFC/` directory.
3. The community and maintainers will discuss the proposal.
4. Once consensus is reached, the RFC is merged and marked as `Accepted`.

## Issue Flow
1. **Search**: Ensure the issue hasn't been reported.
2. **Template**: Use the provided issue templates (Bug, Feature, Documentation).
3. **Triage**: Maintainers will label the issue (e.g., `bug`, `feature`, `help wanted`).
4. **Resolution**: The issue remains open until a PR resolves it or it is marked `wontfix`.

## Pull Request Flow
1. Fork the repository and create a feature branch.
2. Implement your changes. Do NOT mix refactoring with feature additions.
3. Ensure all CI tests pass (`npm run validate`).
4. Submit the PR using the Pull Request Template.
5. A maintainer will review your code.

## Maintainer Review
Maintainers are responsible for:
- Ensuring alignment with the OWIS specification and RFCs.
- Verifying code quality, deterministic behavior, and security.
- Approving and merging PRs.

## Release Cycle
OWIS follows strict Semantic Versioning. Releases are categorized into Alpha, Beta, RC (Release Candidate), and Stable. See [RELEASE_POLICY.md](./RELEASE_POLICY.md) for details.
