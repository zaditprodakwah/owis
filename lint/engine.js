const registry = require('./registry');
const scorer = require('./scorer');

class LintEngine {
  /**
   * Run the linter against a parsed Workspace Intelligence Report (WIR) and Context
   * @param {Object} context - Raw workspace context (from owis-runtime Parser)
   * @param {Object} wir - Generated WIR object
   * @returns {Object} Linting results containing diagnostics and score
   */
  lint(context, wir) {
    let diagnostics = [];
    
    const rules = registry.getRules();
    for (const rule of rules) {
      try {
        const results = rule.evaluate(context, wir);
        if (Array.isArray(results)) {
          diagnostics.push(...results);
        }
      } catch (err) {
        // Fallback for rule crash
        diagnostics.push({
          code: 'OWIS_INTERNAL',
          severity: 'ERROR',
          title: 'Rule Evaluation Failed',
          message: `Rule ${rule.code} threw an error: ${err.message}`
        });
      }
    }

    const score = scorer.calculate(diagnostics);

    return {
      diagnostics,
      score,
      timestamp: new Date().toISOString()
    };
  }
}

module.exports = new LintEngine();
