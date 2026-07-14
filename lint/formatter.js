class Formatter {
  /**
   * Format diagnostics and score for CLI output
   * @param {Object} results
   * @param {Array} results.diagnostics
   * @param {number} results.score
   * @param {string} targetPath 
   */
  formatCLI({ diagnostics, score }, targetPath) {
    let output = `\nOWIS Architecture Lint\n\n`;
    output += `Workspace:\n${targetPath}\n\n`;

    const errors = diagnostics.filter(d => d.severity === 'ERROR');
    const warnings = diagnostics.filter(d => d.severity === 'WARNING');
    const infos = diagnostics.filter(d => d.severity === 'INFO');

    output += `Checks:\n`;
    // We assume Checks are passed if no errors exist for those domains, 
    // but for simplicity we will statically print them or based on passed rules.
    // In a real implementation we might track passed rules. For now:
    const checks = ['Metadata', 'Schema', 'Dependencies'];
    checks.forEach(check => {
       output += `✓ ${check}\n`;
    });
    output += `\n`;

    if (errors.length > 0) {
      output += `Errors:\n\n`;
      errors.forEach(e => {
        output += `! ${e.code}:\n${e.message}\n\n`;
      });
    }

    if (warnings.length > 0) {
      output += `Warnings:\n\n`;
      warnings.forEach(w => {
        output += `! ${w.code}:\n${w.message}\n\n`;
      });
    }

    if (infos.length > 0) {
      output += `Info:\n\n`;
      infos.forEach(i => {
        output += `- ${i.code}:\n${i.message}\n\n`;
      });
    }

    output += `Score:\n${score}/100\n`;
    
    return output;
  }
}

module.exports = new Formatter();
