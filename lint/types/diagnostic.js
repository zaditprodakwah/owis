/**
 * Diagnostic Model
 * Represents a single finding from a lint rule.
 */
class Diagnostic {
  /**
   * @param {Object} options
   * @param {string} options.code - Rule code (e.g., OWIS003)
   * @param {'ERROR'|'WARNING'|'INFO'} options.severity - Severity level
   * @param {string} options.title - Short title of the diagnostic
   * @param {string} options.message - Detailed message
   * @param {string} [options.location] - Location of the issue (e.g., file path or object key)
   * @param {string} [options.recommendation] - Recommendation to fix the issue
   */
  constructor({ code, severity, title, message, location = '', recommendation = '' }) {
    this.code = code;
    this.severity = severity;
    this.title = title;
    this.message = message;
    this.location = location;
    this.recommendation = recommendation;
  }
}

module.exports = Diagnostic;
