class RuleRegistry {
  constructor() {
    this.rules = [];
  }

  /**
   * Register a linting rule
   * @param {Object} rule - The rule object
   * @param {string} rule.code - The rule ID
   * @param {string} rule.name - Human-readable name
   * @param {Function} rule.evaluate - Function that takes (workspaceContext, WIR) and returns an array of Diagnostics
   */
  register(rule) {
    this.rules.push(rule);
  }

  getRules() {
    return this.rules;
  }
}

module.exports = new RuleRegistry();
