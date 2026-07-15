/**
 * OWIS Performance Benchmarks — Informational Only
 *
 * Records elapsed time, peak memory, graph node count, graph edge count,
 * and file count for small, medium, large, and monorepo fixture scales.
 *
 * Policy (Phase 15):
 * - Benchmarks run only on Ubuntu in CI and DO NOT block merges.
 * - No hardcoded latency thresholds. Hardware differences make them unreliable.
 * - CI failures are triggered only by:
 *     - Uncaught exception or unhandled rejection
 *     - Process timeout (enforced externally by CI step timeout)
 *     - Out-of-memory crash
 *     - Deterministic output changes unexpectedly
 * - Results are written to benchmarks/results/ for trend analysis in future releases.
 */

'use strict';

const fs = require('fs');
const path = require('path');

const { parseWorkspace } = require('../runtime/src/parser');
const { parseGraph, analyzeGraph, serializeGraph } = require('../graph/index');
const { buildContext, sanitizeContext, serializeContext } = require('../context/index');

const FIXTURES_DIR = path.join(__dirname, '../fixtures/golden');
const RESULTS_DIR = path.join(__dirname, 'results');

// Ensure results directory exists
if (!fs.existsSync(RESULTS_DIR)) {
  fs.mkdirSync(RESULTS_DIR, { recursive: true });
}

/**
 * Returns current heap memory in MB.
 */
function heapMB() {
  return (process.memoryUsage().heapUsed / 1024 / 1024);
}

/**
 * Runs a single benchmark for the given fixture directory.
 * @param {string} name  Fixture name (small/medium/large/monorepo)
 * @param {string} dir   Absolute path to fixture directory
 * @returns {object}     Benchmark result record
 */
function runFixtureBenchmark(name, dir) {
  const result = {
    fixture: name,
    timestamp: new Date().toISOString(),
    phases: {}
  };

  const memBefore = heapMB();

  // ── Phase 1: WIR parse ────────────────────────────────────────────────
  const t0 = performance.now();
  let wir;
  try {
    wir = parseWorkspace(dir);
  } catch (e) {
    result.error = `parseWorkspace failed: ${e.message}`;
    return result;
  }
  const t1 = performance.now();

  result.phases.parse = {
    elapsedMs: +(t1 - t0).toFixed(3),
    fileCount: wir.workspace.scanned_files,
    directoryCount: wir.workspace.scanned_directories
  };

  // ── Phase 2: Graph extraction ─────────────────────────────────────────
  const t2 = performance.now();
  let graph;
  let serialized;
  let analysis;
  try {
    graph = parseGraph(dir, wir);
    serialized = serializeGraph(graph);
    analysis = analyzeGraph(graph);
  } catch (e) {
    result.error = `graph extraction failed: ${e.message}`;
    return result;
  }
  const t3 = performance.now();

  result.phases.graph = {
    elapsedMs: +(t3 - t2).toFixed(3),
    nodeCount: analysis.counts.nodes,
    edgeCount: analysis.counts.edges
  };

  // ── Phase 3: Context build + sanitize ─────────────────────────────────
  const t4 = performance.now();
  let contextOutput;
  try {
    const payloads = { wir, graph: serialized };
    const sourcesMap = { wir: 'wir.json', graph: 'wir.graph.json' };
    const raw = buildContext(payloads, sourcesMap);
    const { context: clean } = sanitizeContext(raw);
    contextOutput = serializeContext(clean, 'json');
  } catch (e) {
    result.error = `context build failed: ${e.message}`;
    return result;
  }
  const t5 = performance.now();

  result.phases.context = {
    elapsedMs: +(t5 - t4).toFixed(3),
    outputBytes: Buffer.byteLength(contextOutput, 'utf8')
  };

  // ── Summary ────────────────────────────────────────────────────────────
  const memAfter = heapMB();
  result.summary = {
    totalElapsedMs: +(t5 - t0).toFixed(3),
    peakMemoryMB: +Math.max(memBefore, memAfter).toFixed(3),
    fileCount: wir.workspace.scanned_files,
    graphNodeCount: analysis.counts.nodes,
    graphEdgeCount: analysis.counts.edges
  };

  return result;
}

// ── Run benchmarks ─────────────────────────────────────────────────────────

const fixtures = [
  { name: 'simple',   dir: path.join(FIXTURES_DIR, 'simple') },
  { name: 'medium',   dir: path.join(FIXTURES_DIR, 'medium') },
  { name: 'large',    dir: path.join(FIXTURES_DIR, 'large') },
  { name: 'monorepo', dir: path.join(FIXTURES_DIR, 'monorepo') }
];

const allResults = [];
let anyError = false;

console.log('');
console.log('═══════════════════════════════════════════════════════');
console.log('          OWIS Performance Benchmarks (Informational)  ');
console.log('═══════════════════════════════════════════════════════');
console.log('');

for (const { name, dir } of fixtures) {
  if (!fs.existsSync(dir)) {
    console.warn(`  [SKIP] Fixture not found: ${name} (${dir})`);
    continue;
  }

  process.stdout.write(`  Running: ${name.padEnd(10)}`);
  const result = runFixtureBenchmark(name, dir);
  allResults.push(result);

  if (result.error) {
    console.log(`  ✗ ERROR: ${result.error}`);
    anyError = true;
    continue;
  }

  const s = result.summary;
  console.log(`✓`);
  console.log(`    Files:        ${s.fileCount}`);
  console.log(`    Graph Nodes:  ${s.graphNodeCount}`);
  console.log(`    Graph Edges:  ${s.graphEdgeCount}`);
  console.log(`    Total Time:   ${s.totalElapsedMs} ms`);
  console.log(`    Peak Memory:  ${s.peakMemoryMB.toFixed(2)} MB`);
  console.log('');
}

// ── Write results JSON ─────────────────────────────────────────────────────

const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
const resultsFile = path.join(RESULTS_DIR, `benchmark-${timestamp}.json`);

const report = {
  generatedAt: new Date().toISOString(),
  nodeVersion: process.version,
  platform: process.platform,
  arch: process.arch,
  results: allResults
};

fs.writeFileSync(resultsFile, JSON.stringify(report, null, 2), 'utf8');

console.log('═══════════════════════════════════════════════════════');
console.log(`  Results written to: benchmarks/results/benchmark-${timestamp}.json`);
console.log('═══════════════════════════════════════════════════════');
console.log('');

// Exit non-zero only on hard failure (exception = already thrown above)
// Benchmark slowness is NOT a failure per Phase 15 policy.
if (anyError) {
  process.exit(1);
}
