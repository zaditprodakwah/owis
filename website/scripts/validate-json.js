const fs = require('fs');
const path = require('path');

const schemaDir = path.join(__dirname, '../../docs/20-SCHEMA');
const files = fs.readdirSync(schemaDir);

let failed = false;

files.forEach(file => {
  if (file.endsWith('.json')) {
    const filePath = path.join(schemaDir, file);
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      JSON.parse(content);
      console.log(`✓ ${file} is valid JSON`);
    } catch (e) {
      console.error(`✗ ${file} failed parsing:`, e.message);
      failed = true;
    }
  }
});

if (failed) {
  process.exit(1);
} else {
  console.log('All schemas are valid JSON!');
}
