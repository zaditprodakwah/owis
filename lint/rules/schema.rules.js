const Diagnostic = require('../types/diagnostic');
const registry = require('../registry');

registry.register({
  code: 'OWIS002',
  name: 'Invalid schema reference',
  evaluate: (context, wir) => {
    const diagnostics = [];
    if (wir.$schema && !wir.$schema.includes('wir.schema.json')) {
      diagnostics.push(new Diagnostic({
        code: 'OWIS002',
        severity: 'ERROR',
        title: 'Invalid Schema Reference',
        message: 'The WIR document references an invalid or unknown schema.',
        location: '$schema',
        recommendation: 'Ensure $schema points to a valid OWIS wir.schema.json URL or local file.'
      }));
    }
    return diagnostics;
  }
});
