const { buildContext } = require('./builder');
const { sanitizeContext } = require('./sanitizer');
const { validateContext } = require('./validator');
const { serializeContext } = require('./serializer');
const fs = require('fs');

/**
 * Loads a pre-existing context payload without rebuilding it.
 * @param {string} filepath Path to the context.json file.
 */
function loadContext(filepath) {
  const data = fs.readFileSync(filepath, 'utf8');
  return JSON.parse(data);
}

module.exports = {
  buildContext,
  sanitizeContext,
  validateContext,
  serializeContext,
  loadContext
};
