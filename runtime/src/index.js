const fs = require('fs');
const path = require('path');
const { parseWorkspace } = require('./parser');
const { validate } = require('./validator');

const args = process.argv.slice(2);
const targetWorkspace = args[0] || path.join(__dirname, '../..');

console.log(`Starting OWIS Reference Runtime...`);
console.log(`Target Workspace: ${path.resolve(targetWorkspace)}`);

try {
  // Parse workspace
  const wir = parseWorkspace(targetWorkspace);
  console.log('✓ Workspace scanned successfully.');

  // Validate workspace config if exists
  const configPath = path.join(targetWorkspace, 'owis.json');
  if (fs.existsSync(configPath)) {
    const configData = JSON.parse(fs.readFileSync(configPath, 'utf8'));
    const configVal = validate('workspace', configData);
    if (!configVal.valid) {
      console.warn('⚠ Config validation failed:', configVal.errors);
    } else {
      console.log('✓ Config is valid against workspace schema.');
    }
  }

  // Validate generated WIR report
  const wirVal = validate('wir', wir);
  if (!wirVal.valid) {
    console.error('✗ Generated WIR is invalid:', wirVal.errors);
    process.exit(1);
  }
  console.log('✓ Generated WIR is valid against WIR schema.');

  // Write WIR report
  const wirOutputPath = path.join(targetWorkspace, 'wir.json');
  fs.writeFileSync(wirOutputPath, JSON.stringify(wir, null, 2), 'utf8');
  console.log(`✓ WIR saved to: ${wirOutputPath}`);
  console.log('Reference Runtime completed successfully!');

} catch (err) {
  console.error('✗ Runtime failed:', err.message);
  process.exit(1);
}
