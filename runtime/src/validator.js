const Ajv = require('ajv');
const fs = require('fs');
const path = require('path');

const ajv = new Ajv({ allErrors: true });

function validate(schemaName, data) {
  const schemaPath = path.join(__dirname, '../../docs/20-SCHEMA', `${schemaName}.schema.json`);
  if (!fs.existsSync(schemaPath)) {
    throw new Error(`Schema ${schemaName} not found at ${schemaPath}`);
  }
  const schemaContent = JSON.parse(fs.readFileSync(schemaPath, 'utf8'));
  const validateFn = ajv.compile(schemaContent);
  const valid = validateFn(data);
  return {
    valid,
    errors: validateFn.errors
  };
}

module.exports = { validate };
