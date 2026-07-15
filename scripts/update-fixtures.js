/**
 * Fixture Update Utility
 *
 * Regenerates all golden fixtures by running the full OWIS pipeline on each fixture directory.
 * This script must be run explicitly when fixture content changes or the WIR/graph/context
 * generation logic changes.
 *
 * Usage:
 *   npm run fixtures:update
 *
 * Policy (Phase 15):
 * - Golden fixtures are specification artifacts.
 * - They are manually curated and reviewed like documentation.
 * - Every regeneration must be accompanied by a snapshot review (git diff).
 * - CI compares against committed fixtures; it does NOT regenerate them.
 */

'use strict';

const fs = require('fs');
const path = require('path');
const { parseWorkspace } = require('../runtime/src/parser');
const { parseGraph, serializeGraph } = require('../graph/index');
const { buildContext, sanitizeContext, validateContext, serializeContext } = require('../context/index');

const FIXTURES_DIR = path.join(__dirname, '../fixtures/golden');
const FIXTURES = ['simple', 'medium', 'large', 'monorepo'];

/**
 * Deterministic JSON stringify with sorted keys.
 */
function stringifyDeterministic(obj) {
  function sortKeys(val) {
    if (val !== null && typeof val === 'object' && !Array.isArray(val)) {
      return Object.keys(val).sort().reduce((acc, key) => {
        acc[key] = sortKeys(val[key]);
        return acc;
      }, {});
    }
    if (Array.isArray(val)) {
      return val.map(sortKeys);
    }
    return val;
  }
  return JSON.stringify(sortKeys(obj), null, 2);
}

/**
 * Normalizes a WIR by replacing dynamic fields with placeholders.
 */
function normalizeWIR(wir) {
  const copy = JSON.parse(JSON.stringify(wir));
  if (copy.workspace) {
    copy.workspace.generated_at = 'SNAPSHOT';
    copy.workspace.root = 'SNAPSHOT';
  }
  return copy;
}

/**
 * Normalizes a context by replacing dynamic fields with placeholders.
 */
function normalizeContext(ctx) {
  const copy = JSON.parse(JSON.stringify(ctx));
  copy.generatedAt = 'SNAPSHOT';
  return copy;
}

/**
 * Updates a single fixture directory.
 */
function updateFixture(name, dir) {
  console.log(`\n[${name}] Updating fixture...`);

  if (!fs.existsSync(dir)) {
    console.error(`  ✗ Fixture directory not found: ${dir}`);
    return false;
  }

  try {
    // Step 1: Generate WIR
    console.log(`  [1/4] Generating WIR...`);
    const wir = parseWorkspace(dir);
    const normalizedWIR = normalizeWIR(wir);
    fs.writeFileSync(
      path.join(dir, 'wir.json'),
      stringifyDeterministic(normalizedWIR),
      'utf8'
    );
    console.log(`  ✓ wir.json written`);

    // Step 2: Generate Graph
    console.log(`  [2/4] Generating graph...`);
    const graph = parseGraph(dir, wir);
    const serializedGraph = serializeGraph(graph);
    fs.writeFileSync(
      path.join(dir, 'wir.graph.json'),
      stringifyDeterministic(serializedGraph),
      'utf8'
    );
    console.log(`  ✓ wir.graph.json written`);

    // Step 3: Generate Context
    console.log(`  [3/4] Generating context...`);
    const wsPath = path.join(dir, 'workspace.json');
    const payloads = { wir, graph: serializedGraph };
    const sourcesMap = { wir: 'wir.json', graph: 'wir.graph.json' };

    if (fs.existsSync(wsPath)) {
      payloads.workspace = JSON.parse(fs.readFileSync(wsPath, 'utf8'));
      sourcesMap.workspace = 'workspace.json';
    }

    const rawContext = buildContext(payloads, sourcesMap);
    const { context: cleanContext } = sanitizeContext(rawContext);
    
    const valResult = validateContext(cleanContext);
    if (!valResult.valid) {
      console.error(`  ✗ Context validation failed:`, valResult.errors);
      return false;
    }

    const normalizedContext = normalizeContext(cleanContext);
    const contextJSON = serializeContext(normalizedContext, 'json');
    const contextMD = serializeContext(normalizedContext, 'markdown');

    fs.writeFileSync(path.join(dir, 'context.json'), contextJSON, 'utf8');
    fs.writeFileSync(path.join(dir, 'context.md'), contextMD, 'utf8');
    console.log(`  ✓ context.json written`);
    console.log(`  ✓ context.md written`);

    // Step 4: Summary
    console.log(`  [4/4] Summary:`);
    console.log(`    Files: ${wir.workspace.scanned_files}`);
    console.log(`    Graph nodes: ${serializedGraph.nodes.length}`);
    console.log(`    Graph edges: ${serializedGraph.edges.length}`);

    return true;
  } catch (e) {
    console.error(`  ✗ Error updating fixture ${name}:`, e.message);
    return false;
  }
}

// ── Main ───────────────────────────────────────────────────────────────────

console.log('═══════════════════════════════════════════════════════');
console.log('       Golden Fixture Update Utility                  ');
console.log('═══════════════════════════════════════════════════════');

let allSuccess = true;

for (const fixture of FIXTURES) {
  const dir = path.join(FIXTURES_DIR, fixture);
  const success = updateFixture(fixture, dir);
  if (!success) allSuccess = false;
}

console.log('');
console.log('═══════════════════════════════════════════════════════');
if (allSuccess) {
  console.log('  All golden fixtures updated successfully! ✓         ');
  console.log('  Review changes with: git diff fixtures/golden/      ');
} else {
  console.log('  Some fixtures failed to update. See errors above.   ');
}
console.log('═══════════════════════════════════════════════════════');
console.log('');

process.exit(allSuccess ? 0 : 1);
