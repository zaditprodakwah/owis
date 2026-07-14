const Diagnostic = require('../types/diagnostic');
const registry = require('../registry');

// OWIS003: Undocumented component
registry.register({
  code: 'OWIS003',
  name: 'Undocumented component',
  evaluate: (context, wir) => {
    const diagnostics = [];
    
    // We could check if there are artifacts missing description
    if (wir.artifacts && Array.isArray(wir.artifacts)) {
      wir.artifacts.forEach((artifact, idx) => {
        if (!artifact.description || artifact.description.trim() === '') {
          diagnostics.push(new Diagnostic({
            code: 'OWIS003',
            severity: 'WARNING',
            title: 'Undocumented Component',
            message: `Artifact "${artifact.path || 'unknown'}" is missing documentation.`,
            location: `artifacts[${idx}]`,
            recommendation: 'Add a description field to the artifact metadata.'
          }));
        }
      });
    }

    return diagnostics;
  }
});

// OWIS004: Dependency relationship missing
registry.register({
  code: 'OWIS004',
  name: 'Dependency relationship missing',
  evaluate: (context, wir) => {
    const diagnostics = [];
    
    // As a placeholder, we might expect a dependencies field to not be empty for certain types
    // Since we don't strictly enforce it in schema if it's missing, we flag it in linting.
    if (wir.dependencies && Array.isArray(wir.dependencies) && wir.dependencies.length === 0) {
       diagnostics.push(new Diagnostic({
         code: 'OWIS004',
         severity: 'INFO',
         title: 'Dependency Relationship Missing',
         message: 'No dependencies are explicitly declared in the WIR, which might mean relationships are missing.',
         location: 'dependencies',
         recommendation: 'Consider extracting dependencies using OWIS dependency analysis tools.'
       }));
    }

    return diagnostics;
  }
});
