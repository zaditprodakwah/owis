const Diagnostic = require('../types/diagnostic');
const registry = require('../registry');

registry.register({
  code: 'OWIS001',
  name: 'Missing workspace metadata',
  evaluate: (context, wir) => {
    const diagnostics = [];
    if (!wir.project || !wir.project.name || !wir.project.version) {
      diagnostics.push(new Diagnostic({
        code: 'OWIS001',
        severity: 'WARNING',
        title: 'Missing Workspace Metadata',
        message: 'The workspace is missing required metadata such as project name or version.',
        location: 'workspace.json',
        recommendation: 'Ensure package.json or pyproject.toml defines name and version.'
      }));
    }
    return diagnostics;
  }
});
