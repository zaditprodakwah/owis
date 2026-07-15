const Ajv = require('ajv');
const schema = require('./schema.json');

const ajv = new Ajv({ allErrors: true });
const validateSchema = ajv.compile(schema);

/**
 * Validates the canonical context.
 */
function validateContext(context) {
  const valid = validateSchema(context);
  
  // Custom checks: deterministic output verification
  // Since objects in JS iterate properties in insertion order, we rely on the builder to construct them deterministically.
  
  if (!valid) {
    return {
      valid: false,
      errors: validateSchema.errors
    };
  }
  
  return {
    valid: true,
    errors: []
  };
}

module.exports = {
  validateContext
};
