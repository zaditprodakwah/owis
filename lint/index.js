const engine = require('./engine');
const registry = require('./registry');
const formatter = require('./formatter');
const Diagnostic = require('./types/diagnostic');

// Expose the public API of the lint package
module.exports = {
  engine,
  registry,
  formatter,
  Diagnostic,
  
  /**
   * Helper function to quickly load default rules
   */
  loadDefaultRules: () => {
    require('./rules');
  }
};
