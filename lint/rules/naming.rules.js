const Diagnostic = require('../types/diagnostic');
const registry = require('../registry');

registry.register({
  code: 'OWIS005',
  name: 'Naming convention violation',
  evaluate: (context, wir) => {
    const diagnostics = [];
    
    // As an example, if there are components or artifacts missing proper naming formats
    if (wir.artifacts && Array.isArray(wir.artifacts)) {
      wir.artifacts.forEach((artifact, idx) => {
        if (artifact.path && artifact.path.includes(' ')) {
          diagnostics.push(new Diagnostic({
            code: 'OWIS005',
            severity: 'WARNING',
            title: 'Naming Convention Violation',
            message: `Artifact path contains spaces which is not recommended: "${artifact.path}"`,
            location: `artifacts[${idx}].path`,
            recommendation: 'Use kebab-case or snake_case for file names without spaces.'
          }));
        }
      });
    }

    return diagnostics;
  }
});
