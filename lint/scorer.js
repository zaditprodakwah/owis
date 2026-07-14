/**
 * Scoring Engine
 */
class Scorer {
  /**
   * Calculates architecture score out of 100 based on diagnostics.
   * @param {Array<Object>} diagnostics
   * @returns {number} 0-100 score
   */
  calculate(diagnostics) {
    let score = 100;

    for (const diag of diagnostics) {
      if (diag.severity === 'ERROR') {
        score -= 20;
      } else if (diag.severity === 'WARNING') {
        score -= 5;
      }
      // INFO does not affect score
    }

    return Math.max(0, score);
  }
}

module.exports = new Scorer();
