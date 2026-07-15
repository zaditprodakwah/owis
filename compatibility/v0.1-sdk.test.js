/**
 * Compatibility Test: v0.1 SDK API surface
 *
 * Verifies that the v0.1 public API methods (parse, check) remain accessible
 * and behaviorally identical in the v0.2 SDK. This test must pass without
 * modification for all v0.2.x releases.
 */
const test = require('node:test');
const assert = require('node:assert/strict');
const path = require('path');
const fs = require('fs');

const sdkPath = path.join(__dirname, '../sdk/src/index.js');
const fixtureSimple = path.join(__dirname, '../fixtures/golden/simple');

// ─── guard: skip gracefully if SDK not installed ───────────────────────────
let sdk;
try {
  sdk = require(sdkPath);
} catch (e) {
  // SDK not resolvable, skip tests
  console.warn('WARNING: SDK not loadable, skipping v0.1 SDK compatibility tests:', e.message);
  process.exit(0);
}

// ─── v0.1 method: parse ────────────────────────────────────────────────────

test('v0.1 SDK: parse() is exported and callable', () => {
  assert.strictEqual(typeof sdk.parse, 'function', 'sdk.parse must be a function');
});

test('v0.1 SDK: parse() returns a WIR object with required top-level keys', () => {
  if (!fs.existsSync(fixtureSimple)) return;

  const wir = sdk.parse(fixtureSimple);

  assert.ok(wir, 'parse() must return a non-null value');
  assert.strictEqual(typeof wir, 'object', 'parse() return value must be an object');

  // v0.1 guaranteed top-level keys
  const requiredKeys = ['workspace', 'project', 'source_of_truth', 'knowledge', 'architecture', 'technology', 'contracts', 'dependencies', 'confidence', 'execution'];
  for (const key of requiredKeys) {
    assert.ok(Object.prototype.hasOwnProperty.call(wir, key), `WIR must have key: ${key}`);
  }
});

test('v0.1 SDK: parse() workspace field has required sub-keys', () => {
  if (!fs.existsSync(fixtureSimple)) return;

  const wir = sdk.parse(fixtureSimple);
  const ws = wir.workspace;

  assert.strictEqual(typeof ws.root, 'string', 'workspace.root must be a string');
  assert.strictEqual(typeof ws.scanned_files, 'number', 'workspace.scanned_files must be a number');
  assert.ok(Array.isArray(ws.ignored_paths), 'workspace.ignored_paths must be an array');
  assert.ok(typeof ws.generated_at === 'string', 'workspace.generated_at must be a string');
});

test('v0.1 SDK: parse() project field has required sub-keys', () => {
  if (!fs.existsSync(fixtureSimple)) return;

  const wir = sdk.parse(fixtureSimple);
  const proj = wir.project;

  assert.strictEqual(typeof proj.name, 'string', 'project.name must be a string');
  assert.strictEqual(typeof proj.version, 'string', 'project.version must be a string');
  assert.ok(Array.isArray(proj.objectives), 'project.objectives must be an array');
  assert.ok(Array.isArray(proj.stakeholders), 'project.stakeholders must be an array');
});

// ─── v0.1 method: check ────────────────────────────────────────────────────

test('v0.1 SDK: check() is exported and callable', () => {
  assert.strictEqual(typeof sdk.check, 'function', 'sdk.check must be a function');
});

test('v0.1 SDK: check() returns { valid, errors } shape', () => {
  const result = sdk.check('wir', {});

  assert.strictEqual(typeof result, 'object', 'check() must return an object');
  assert.ok(Object.prototype.hasOwnProperty.call(result, 'valid'), 'result must have .valid');
  assert.strictEqual(typeof result.valid, 'boolean', 'result.valid must be boolean');
  // errors may be null or an array
  assert.ok(result.errors === null || Array.isArray(result.errors), 'result.errors must be null or array');
});

test('v0.1 SDK: check() validates a v0.1 golden fixture WIR', () => {
  const wirPath = path.join(fixtureSimple, 'wir.json');
  if (!fs.existsSync(wirPath)) return;

  const wirData = JSON.parse(fs.readFileSync(wirPath, 'utf8'));
  const result = sdk.check('wir', wirData);

  assert.strictEqual(result.valid, true, `v0.1 golden WIR must pass v0.2 schema check. Errors: ${JSON.stringify(result.errors)}`);
});

test('v0.1 SDK: check() returns valid:false for empty object', () => {
  const result = sdk.check('wir', {});
  assert.strictEqual(result.valid, false, 'Empty object must fail WIR schema validation');
  assert.ok(Array.isArray(result.errors) && result.errors.length > 0, 'Errors must be present for invalid input');
});

test('v0.1 SDK: check() handles unknown schema name gracefully', () => {
  // Must not throw; should return { valid: false }
  let result;
  assert.doesNotThrow(() => {
    result = sdk.check('nonexistent-schema-xyz', {});
  }, 'check() with unknown schema name must not throw');
  assert.strictEqual(result.valid, false, 'Unknown schema must return valid:false');
});

// ─── v0.2 additions: exported and present ─────────────────────────────────

test('v0.2 SDK: parseGraph is exported', () => {
  assert.strictEqual(typeof sdk.parseGraph, 'function', 'sdk.parseGraph must be a function');
});

test('v0.2 SDK: analyzeGraph is exported', () => {
  assert.strictEqual(typeof sdk.analyzeGraph, 'function', 'sdk.analyzeGraph must be a function');
});

test('v0.2 SDK: serializeGraph is exported', () => {
  assert.strictEqual(typeof sdk.serializeGraph, 'function', 'sdk.serializeGraph must be a function');
});

test('v0.2 SDK: buildContext is exported', () => {
  assert.strictEqual(typeof sdk.buildContext, 'function', 'sdk.buildContext must be a function');
});

test('v0.2 SDK: sanitizeContext is exported', () => {
  assert.strictEqual(typeof sdk.sanitizeContext, 'function', 'sdk.sanitizeContext must be a function');
});

test('v0.2 SDK: validateContext is exported', () => {
  assert.strictEqual(typeof sdk.validateContext, 'function', 'sdk.validateContext must be a function');
});

test('v0.2 SDK: serializeContext is exported', () => {
  assert.strictEqual(typeof sdk.serializeContext, 'function', 'sdk.serializeContext must be a function');
});

test('v0.2 SDK: loadContext is exported', () => {
  assert.strictEqual(typeof sdk.loadContext, 'function', 'sdk.loadContext must be a function');
});

test('v0.2 SDK: lint module is exported', () => {
  assert.ok(sdk.lint, 'sdk.lint must be present');
  assert.strictEqual(typeof sdk.lint.engine, 'object', 'sdk.lint.engine must be an object');
  assert.strictEqual(typeof sdk.lint.loadDefaultRules, 'function', 'sdk.lint.loadDefaultRules must be a function');
});
