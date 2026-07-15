const { parseWorkspace } = require('../../runtime/src/parser');
const { validate } = require('../../runtime/src/validator');
const { parseGraph, analyzeGraph, serializeGraph } = require('../../graph');
const lint = require('../../lint');
const { buildContext, sanitizeContext, validateContext, serializeContext, loadContext } = require('../../context');

/**
 * Parses a target workspace and builds a synthesized Workspace Intelligence Report.
 * @param {string} workspacePath Absolute or relative path to the workspace folder.
 * @returns {object} The generated WIR payload.
 */
function parse(workspacePath) {
  return parseWorkspace(workspacePath);
}

/**
 * Validates data against a specific JSON schema of the OWIS specification.
 * @param {string} schemaName The name of the target schema (e.g. 'wir', 'workspace').
 * @param {object} data The payload data to validate.
 * @returns {{valid: boolean, errors: Array}} An object indicating validity and validation errors.
 */
function check(schemaName, data) {
  return validate(schemaName, data);
}

module.exports = {
  parse,
  check,
  parseGraph,
  analyzeGraph,
  serializeGraph,
  lint,
  buildContext,
  sanitizeContext,
  validateContext,
  serializeContext: (context, format) => serializeContext(context, format),
  loadContext
};
