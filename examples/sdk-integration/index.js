const path = require('path');
const owis = require('../../sdk/src/index.js');

async function runDemo() {
  console.log('--- OWIS SDK Integration Demo ---');
  
  const targetWorkspace = path.join(__dirname, '../simple-node-app');
  console.log(`Analyzing workspace: ${targetWorkspace}`);
  
  try {
    const wir = owis.parse(targetWorkspace);
    console.log('\n[1] Parser Result:');
    console.log(`Detected Languages: ${wir.technology.languages.join(', ') || 'None'}`);
    
    const validation = owis.check('wir', wir);
    console.log('\n[2] Validation Result:');
    if (validation.valid) {
      console.log('✓ WIR is fully compliant with OWIS schemas.');
    } else {
      console.error('✗ Validation failed:', validation.errors);
    }
  } catch (err) {
    console.error('SDK Error:', err.message);
  }
}

runDemo();
