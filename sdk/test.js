const { parse, check } = require('./src/index');
const path = require('path');

console.log('Testing OWIS programmatic SDK...');

try {
  const target = path.join(__dirname, '../examples/test-workspace');
  const wir = parse(target);
  console.log('✓ Programmatic parser scan passed.');

  const val = check('wir', wir);
  if (!val.valid) {
    console.error('✗ Programmatic validator failed:', val.errors);
    process.exit(1);
  }
  console.log('✓ Programmatic validator passed.');
  console.log('SDK tests passed successfully!');
} catch (e) {
  console.error('✗ SDK Error:', e.message);
  process.exit(1);
}
