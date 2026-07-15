/**
 * Snapshot Test Suite — Phase 15
 *
 * Verifies that golden fixtures are internally consistent and structurally valid.
 * Snapshots are specification artifacts. Any unexpected difference is a regression.
 *
 * Policy:
 * - Tests compare against committed golden fixtures.
 * - Dynamic fields (timestamps, absolute paths) are normalized before comparison.
 * - Run `npm run fixtures:update` to intentionally regenerate golden fixtures.
 */
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const path = require('path');

const FIXTURES_DIR = path.join(__dirname, '../../fixtures/golden');
const FIXTURES = ['simple', 'medium', 'large', 'monorepo'];

// ─── normalization helpers ─────────────────────────────────────────────────

/**
 * Normalizes dynamic fields before snapshot comparison.
 * Replaces timestamps and absolute paths with deterministic placeholders.
 */
function normalizeWIR(wir) {
  const copy = JSON.parse(JSON.stringify(wir));
  if (copy.workspace) {
    if (copy.workspace.generated_at) copy.workspace.generated_at = 'SNAPSHOT';
    if (copy.workspace.root) copy.workspace.root = 'SNAPSHOT';
  }
  return copy;
}

function normalizeContext(ctx) {
  const copy = JSON.parse(JSON.stringify(ctx));
  if (copy.generatedAt) copy.generatedAt = 'SNAPSHOT';
  // Normalize any absolute paths in architecture.modules
  if (copy.architecture && copy.architecture.modules) {
    copy.architecture.modules = copy.architecture.modules.map(m => ({
      ...m,
      path: m.path ? m.path.replace(/\\/g, '/') : m.path
    }));
  }
  return copy;
}

function normalizeGraph(graph) {
  const copy = JSON.parse(JSON.stringify(graph));
  // Normalize path separators in node metadata
  if (copy.nodes) {
    copy.nodes = copy.nodes.map(n => ({
      ...n,
      metadata: n.metadata
        ? Object.fromEntries(
            Object.entries(n.metadata).map(([k, v]) =>
              [k, typeof v === 'string' ? v.replace(/\\/g, '/') : v]
            )
          )
        : n.metadata
    }));
  }
  return copy;
}

/**
 * Verifies that an object's keys are sorted alphabetically (determinism check).
 */
function assertKeysSorted(obj, label) {
  const keys = Object.keys(obj);
  const sorted = [...keys].sort();
  assert.deepStrictEqual(
    keys,
    sorted,
    `${label}: keys must be sorted alphabetically. Got: [${keys.join(', ')}], expected: [${sorted.join(', ')}]`
  );
}

/**
 * Recursively checks that all object keys are sorted.
 * Skips arrays and primitive values.
 */
function assertAllKeysSorted(obj, path = 'root') {
  if (obj === null || typeof obj !== 'object' || Array.isArray(obj)) return;
  assertKeysSorted(obj, path);
  for (const [k, v] of Object.entries(obj)) {
    assertAllKeysSorted(v, `${path}.${k}`);
  }
}

// ─── per-fixture tests ────────────────────────────────────────────────────

for (const fixture of FIXTURES) {
  const fixtureDir = path.join(FIXTURES_DIR, fixture);

  // --- WIR ---
  test(`Snapshot [${fixture}]: wir.json exists`, () => {
    assert.ok(
      fs.existsSync(path.join(fixtureDir, 'wir.json')),
      `fixtures/golden/${fixture}/wir.json must exist`
    );
  });

  test(`Snapshot [${fixture}]: wir.json is valid JSON`, () => {
    const raw = fs.readFileSync(path.join(fixtureDir, 'wir.json'), 'utf8');
    let wir;
    assert.doesNotThrow(() => {
      wir = JSON.parse(raw);
    }, `fixtures/golden/${fixture}/wir.json must be valid JSON`);
    assert.ok(wir, 'wir.json must parse to a non-null object');
  });

  test(`Snapshot [${fixture}]: wir.json has deterministically sorted keys`, () => {
    const raw = fs.readFileSync(path.join(fixtureDir, 'wir.json'), 'utf8');
    const wir = JSON.parse(raw);
    const normalized = normalizeWIR(wir);
    assertAllKeysSorted(normalized, `wir[${fixture}]`);
  });

  test(`Snapshot [${fixture}]: wir.json has required top-level fields`, () => {
    const wir = JSON.parse(fs.readFileSync(path.join(fixtureDir, 'wir.json'), 'utf8'));
    const required = ['workspace', 'project', 'source_of_truth', 'knowledge', 'architecture', 'technology', 'contracts', 'dependencies', 'confidence', 'execution'];
    for (const field of required) {
      assert.ok(Object.prototype.hasOwnProperty.call(wir, field), `wir[${fixture}] must have field: ${field}`);
    }
  });

  test(`Snapshot [${fixture}]: wir.json project has required sub-fields`, () => {
    const wir = JSON.parse(fs.readFileSync(path.join(fixtureDir, 'wir.json'), 'utf8'));
    const proj = wir.project;
    assert.strictEqual(typeof proj.name, 'string', `wir[${fixture}].project.name must be a string`);
    assert.strictEqual(typeof proj.version, 'string', `wir[${fixture}].project.version must be a string`);
    assert.ok(proj.name.length > 0, `wir[${fixture}].project.name must not be empty`);
  });

  test(`Snapshot [${fixture}]: wir.json technology.languages is an array`, () => {
    const wir = JSON.parse(fs.readFileSync(path.join(fixtureDir, 'wir.json'), 'utf8'));
    assert.ok(Array.isArray(wir.technology.languages), `wir[${fixture}].technology.languages must be an array`);
  });

  // --- Graph ---
  test(`Snapshot [${fixture}]: wir.graph.json exists`, () => {
    assert.ok(
      fs.existsSync(path.join(fixtureDir, 'wir.graph.json')),
      `fixtures/golden/${fixture}/wir.graph.json must exist`
    );
  });

  test(`Snapshot [${fixture}]: wir.graph.json is valid JSON`, () => {
    const raw = fs.readFileSync(path.join(fixtureDir, 'wir.graph.json'), 'utf8');
    let graph;
    assert.doesNotThrow(() => {
      graph = JSON.parse(raw);
    }, `fixtures/golden/${fixture}/wir.graph.json must be valid JSON`);
    assert.ok(graph, 'wir.graph.json must parse to a non-null object');
  });

  test(`Snapshot [${fixture}]: wir.graph.json has version, nodes, edges`, () => {
    const graph = JSON.parse(fs.readFileSync(path.join(fixtureDir, 'wir.graph.json'), 'utf8'));
    assert.ok(Object.prototype.hasOwnProperty.call(graph, 'version'), `wir.graph.json[${fixture}] must have version`);
    assert.ok(Array.isArray(graph.nodes), `wir.graph.json[${fixture}].nodes must be an array`);
    assert.ok(Array.isArray(graph.edges), `wir.graph.json[${fixture}].edges must be an array`);
  });

  test(`Snapshot [${fixture}]: wir.graph.json has at least one node`, () => {
    const graph = JSON.parse(fs.readFileSync(path.join(fixtureDir, 'wir.graph.json'), 'utf8'));
    assert.ok(graph.nodes.length > 0, `wir.graph.json[${fixture}] must have at least one node`);
  });

  test(`Snapshot [${fixture}]: wir.graph.json nodes have required fields`, () => {
    const graph = JSON.parse(fs.readFileSync(path.join(fixtureDir, 'wir.graph.json'), 'utf8'));
    for (const node of graph.nodes) {
      assert.ok(typeof node.id === 'string' && node.id.length > 0, `node.id must be a non-empty string in ${fixture}`);
      assert.ok(typeof node.type === 'string', `node.type must be a string in ${fixture}`);
      assert.ok(typeof node.label === 'string', `node.label must be a string in ${fixture}`);
      assert.ok(node.metadata && typeof node.metadata === 'object', `node.metadata must be an object in ${fixture}`);
    }
  });

  test(`Snapshot [${fixture}]: wir.graph.json edges have required fields`, () => {
    const graph = JSON.parse(fs.readFileSync(path.join(fixtureDir, 'wir.graph.json'), 'utf8'));
    for (const edge of graph.edges) {
      assert.ok(typeof edge.from === 'string' && edge.from.length > 0, `edge.from must be a non-empty string in ${fixture}`);
      assert.ok(typeof edge.to === 'string' && edge.to.length > 0, `edge.to must be a non-empty string in ${fixture}`);
      assert.ok(typeof edge.type === 'string', `edge.type must be a string in ${fixture}`);
    }
  });

  test(`Snapshot [${fixture}]: wir.graph.json edge references exist as nodes`, () => {
    const graph = JSON.parse(fs.readFileSync(path.join(fixtureDir, 'wir.graph.json'), 'utf8'));
    const nodeIds = new Set(graph.nodes.map(n => n.id));
    for (const edge of graph.edges) {
      assert.ok(nodeIds.has(edge.from), `Edge.from "${edge.from}" must reference an existing node in ${fixture}`);
      assert.ok(nodeIds.has(edge.to), `Edge.to "${edge.to}" must reference an existing node in ${fixture}`);
    }
  });

  test(`Snapshot [${fixture}]: wir.graph.json has no duplicate node IDs`, () => {
    const graph = JSON.parse(fs.readFileSync(path.join(fixtureDir, 'wir.graph.json'), 'utf8'));
    const ids = graph.nodes.map(n => n.id);
    const unique = new Set(ids);
    assert.strictEqual(ids.length, unique.size, `wir.graph.json[${fixture}] must have no duplicate node IDs`);
  });

  test(`Snapshot [${fixture}]: wir.graph.json uses forward-slash path separators`, () => {
    const raw = fs.readFileSync(path.join(fixtureDir, 'wir.graph.json'), 'utf8');
    // Check that no node id or metadata path contains backslashes
    const graph = JSON.parse(raw);
    for (const node of graph.nodes) {
      assert.ok(!node.id.includes('\\'), `Node ID must not contain backslashes in ${fixture}: "${node.id}"`);
      if (node.metadata && node.metadata.path) {
        assert.ok(!node.metadata.path.includes('\\'), `Node metadata.path must not contain backslashes in ${fixture}: "${node.metadata.path}"`);
      }
    }
  });

  // --- Context ---
  test(`Snapshot [${fixture}]: context.json exists`, () => {
    assert.ok(
      fs.existsSync(path.join(fixtureDir, 'context.json')),
      `fixtures/golden/${fixture}/context.json must exist`
    );
  });

  test(`Snapshot [${fixture}]: context.json is valid JSON`, () => {
    const raw = fs.readFileSync(path.join(fixtureDir, 'context.json'), 'utf8');
    let ctx;
    assert.doesNotThrow(() => {
      ctx = JSON.parse(raw);
    }, `fixtures/golden/${fixture}/context.json must be valid JSON`);
    assert.ok(ctx, 'context.json must parse to a non-null object');
  });

  test(`Snapshot [${fixture}]: context.json has contextVersion "0.2.0"`, () => {
    const ctx = JSON.parse(fs.readFileSync(path.join(fixtureDir, 'context.json'), 'utf8'));
    assert.strictEqual(ctx.contextVersion, '0.2.0', `context[${fixture}].contextVersion must be "0.2.0"`);
  });

  test(`Snapshot [${fixture}]: context.json has required top-level fields`, () => {
    const ctx = JSON.parse(fs.readFileSync(path.join(fixtureDir, 'context.json'), 'utf8'));
    const required = ['contextVersion', 'generatedAt', 'sources', 'workspace', 'architecture', 'graph', 'quality'];
    for (const field of required) {
      assert.ok(Object.prototype.hasOwnProperty.call(ctx, field), `context[${fixture}] must have field: ${field}`);
    }
  });

  test(`Snapshot [${fixture}]: context.json workspace has name and version`, () => {
    const ctx = JSON.parse(fs.readFileSync(path.join(fixtureDir, 'context.json'), 'utf8'));
    assert.strictEqual(typeof ctx.workspace.name, 'string', `context[${fixture}].workspace.name must be a string`);
    assert.ok(ctx.workspace.name.length > 0, `context[${fixture}].workspace.name must not be empty`);
    assert.strictEqual(typeof ctx.workspace.version, 'string', `context[${fixture}].workspace.version must be a string`);
  });

  // --- context.md ---
  test(`Snapshot [${fixture}]: context.md exists`, () => {
    assert.ok(
      fs.existsSync(path.join(fixtureDir, 'context.md')),
      `fixtures/golden/${fixture}/context.md must exist`
    );
  });

  test(`Snapshot [${fixture}]: context.md is non-empty`, () => {
    const raw = fs.readFileSync(path.join(fixtureDir, 'context.md'), 'utf8');
    assert.ok(raw.trim().length > 0, `context.md[${fixture}] must not be empty`);
  });

  test(`Snapshot [${fixture}]: context.md mentions v0.2.0`, () => {
    const raw = fs.readFileSync(path.join(fixtureDir, 'context.md'), 'utf8');
    assert.ok(raw.includes('v0.2.0') || raw.includes('0.2.0'), `context.md[${fixture}] must reference version 0.2.0`);
  });

  // --- workspace.json (fixture source file) ---
  test(`Snapshot [${fixture}]: workspace.json source exists`, () => {
    // simple fixture has it; others should too now
    const wsPath = path.join(fixtureDir, 'workspace.json');
    assert.ok(fs.existsSync(wsPath), `fixtures/golden/${fixture}/workspace.json must exist`);
  });

  test(`Snapshot [${fixture}]: workspace.json is valid JSON`, () => {
    const raw = fs.readFileSync(path.join(fixtureDir, 'workspace.json'), 'utf8');
    let ws;
    assert.doesNotThrow(() => {
      ws = JSON.parse(raw);
    }, `fixtures/golden/${fixture}/workspace.json must be valid JSON`);
    assert.ok(ws.name, `workspace.json[${fixture}] must have a name field`);
  });
}

// ─── cross-fixture consistency ─────────────────────────────────────────────

test('Snapshot: all fixture project names match workspace.json name', () => {
  for (const fixture of FIXTURES) {
    const fixtureDir = path.join(FIXTURES_DIR, fixture);
    const ws = JSON.parse(fs.readFileSync(path.join(fixtureDir, 'workspace.json'), 'utf8'));
    const wir = JSON.parse(fs.readFileSync(path.join(fixtureDir, 'wir.json'), 'utf8'));
    assert.strictEqual(
      wir.project.name,
      ws.name,
      `Fixture ${fixture}: wir.project.name must match workspace.json name`
    );
  }
});

test('Snapshot: all fixture graph versions are "0.2.0"', () => {
  for (const fixture of FIXTURES) {
    const fixtureDir = path.join(FIXTURES_DIR, fixture);
    const graph = JSON.parse(fs.readFileSync(path.join(fixtureDir, 'wir.graph.json'), 'utf8'));
    assert.strictEqual(graph.version, '0.2.0', `Fixture ${fixture}: wir.graph.json version must be "0.2.0"`);
  }
});

test('Snapshot: all fixture contexts have _truncated:false', () => {
  for (const fixture of FIXTURES) {
    const fixtureDir = path.join(FIXTURES_DIR, fixture);
    const ctx = JSON.parse(fs.readFileSync(path.join(fixtureDir, 'context.json'), 'utf8'));
    assert.strictEqual(ctx._truncated, false, `Fixture ${fixture}: context._truncated must be false`);
  }
});
