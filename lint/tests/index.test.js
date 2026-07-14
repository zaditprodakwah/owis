const { engine, loadDefaultRules } = require('../index');
const assert = require('assert');

// Load default rules for testing
loadDefaultRules();

// Helper to run tests
function runTest(name, wir, expectedScore, expectedWarnings, expectedErrors) {
  try {
    const context = {}; // Mock context
    const result = engine.lint(context, wir);

    const errors = result.diagnostics.filter(d => d.severity === 'ERROR');
    const warnings = result.diagnostics.filter(d => d.severity === 'WARNING');

    assert.strictEqual(result.score, expectedScore, `${name}: Expected score ${expectedScore}, got ${result.score}`);
    assert.strictEqual(warnings.length, expectedWarnings, `${name}: Expected ${expectedWarnings} warnings, got ${warnings.length}`);
    assert.strictEqual(errors.length, expectedErrors, `${name}: Expected ${expectedErrors} errors, got ${errors.length}`);
    console.log(`[PASS] ${name}`);
  } catch (err) {
    console.error(`[FAIL] ${name}`, err);
    process.exit(1);
  }
}

// 1. Valid workspace
runTest('Valid workspace', {
  project: { name: 'valid-project', version: '1.0.0' },
  $schema: 'https://raw.githubusercontent.com/zaditprodakwah/owis/main/docs/20-SCHEMA/wir.schema.json',
  artifacts: [
    { path: 'src/main.js', description: 'Main entry' }
  ],
  dependencies: [
    { from: 'src/main.js', to: 'src/utils.js' }
  ]
}, 100, 0, 0);

// 2. Warning workspace (Missing artifact description and space in naming)
runTest('Warning workspace', {
  project: { name: 'warning-project', version: '1.0.0' },
  $schema: 'https://raw.githubusercontent.com/zaditprodakwah/owis/main/docs/20-SCHEMA/wir.schema.json',
  artifacts: [
    { path: 'src/my file.js' } // No description (OWIS003), space in name (OWIS005)
  ],
  dependencies: [{from:'a', to:'b'}]
}, 90, 2, 0); // 100 - 5 (OWIS003) - 5 (OWIS005) = 90

// 3. Error workspace (Invalid schema reference, missing project metadata)
runTest('Error workspace', {
  // missing project name/version (OWIS001 - Warning)
  $schema: 'invalid.schema.json', // Invalid schema (OWIS002 - Error)
  dependencies: [] // Empty dependencies (OWIS004 - INFO - no score deduction)
}, 75, 1, 1); // 100 - 20 (Error) - 5 (Warning) = 75

console.log('All lint tests passed!');
