#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { parseWorkspace } = require('../../runtime/src/parser');
const { validate } = require('../../runtime/src/validator');

const args = process.argv.slice(2);

function printHelp() {
  console.log(`
OWIS CLI Tool v0.1.0

Usage:
  owis [workspace-path] [options]

Options:
  -o, --output <path>    Specify path to save the generated wir.json (default: workspace root)
  -h, --help             Show this help screen
  -v, --version          Show version details
`);
}

if (args.includes('-h') || args.includes('--help')) {
  printHelp();
  process.exit(0);
}

if (args.includes('-v') || args.includes('--version')) {
  console.log('OWIS CLI v0.1.0');
  process.exit(0);
}

// Find output path override
let outputPathOverride = null;
const outputIdx = args.findIndex(arg => arg === '-o' || arg === '--output');
if (outputIdx !== -1 && args[outputIdx + 1]) {
  outputPathOverride = args[outputIdx + 1];
  // Remove options from args
  args.splice(outputIdx, 2);
}

const targetWorkspace = args[0] || process.cwd();

  console.log('\nOWIS Workspace Validation\n');
  console.log(`Workspace:\n${path.resolve(targetWorkspace)}\n`);

try {
  const wir = parseWorkspace(targetWorkspace);
  const wirVal = validate('wir', wir);
  if (!wirVal.valid) {
    console.log('Status:\nNON-COMPLIANT\n');
    console.error('Errors:', wirVal.errors);
    process.exit(1);
  }

  console.log('Detected:');
  if (wir.technology.languages && wir.technology.languages.length > 0) {
    wir.technology.languages.forEach(s => console.log(`✓ Language: ${s}`));
  }
  if (wir.technology.frameworks && wir.technology.frameworks.length > 0) {
    wir.technology.frameworks.forEach(s => console.log(`✓ Framework: ${s}`));
  }
  if (wir.source_of_truth.primary.length > 0 || wir.source_of_truth.secondary.length > 0) {
    console.log('✓ Documentation');
  }
  if (wir.technology.package_managers && wir.technology.package_managers.length > 0) {
    console.log(`✓ Package Metadata (${wir.technology.package_managers.join(', ')})`);
  }
  
  console.log('\nGenerated:');
  console.log('✓ WIR\n');

  const wirOutputPath = outputPathOverride 
    ? path.resolve(outputPathOverride) 
    : path.join(path.resolve(targetWorkspace), 'wir.json');

  fs.writeFileSync(wirOutputPath, JSON.stringify(wir, null, 2), 'utf8');

  console.log('Status:\nCOMPLIANT\n');

} catch (err) {
  console.log('Status:\nNON-COMPLIANT\n');
  console.error('Error:', err.message);
  process.exit(1);
}
