const { execSync } = require('child_process');
const path = require('path');

const rootDir = path.join(__dirname, '..');

function runCommand(command, cwd) {
  console.log(`Running: ${command} in ${cwd}`);
  execSync(command, { cwd, stdio: 'inherit' });
}

console.log('===================================');
console.log('       OWIS Validation Suite       ');
console.log('===================================');

try {
  // 1. Validate JSON schemas
  console.log('\n[1/5] Validating JSON schemas...');
  runCommand('node website/scripts/validate-json.js', rootDir);
  console.log('✓ Schemas valid');

  // 2. Run runtime tests
  console.log('\n[2/5] Running runtime tests...');
  runCommand('npm test', path.join(rootDir, 'runtime'));
  console.log('✓ Runtime passed');

  // 3. Run CLI tests
  console.log('\n[3/5] Running CLI tests...');
  runCommand('npm test', path.join(rootDir, 'cli'));
  console.log('✓ CLI passed');

  // 4. Run SDK tests
  console.log('\n[4/5] Running SDK tests...');
  runCommand('npm test', path.join(rootDir, 'sdk'));
  console.log('✓ SDK passed');

  // 5. Build documentation portal
  console.log('\n[5/5] Building documentation portal...');
  runCommand('npx vitepress build website', rootDir);
  console.log('✓ Documentation built');

  console.log('\n===================================');
  console.log('      All checks passed! 🎉        ');
  console.log('===================================');
} catch (e) {
  console.error('\n✗ Validation suite failed:', e.message);
  process.exit(1);
}
