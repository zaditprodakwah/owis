/**
 * OWIS Validation Pipeline — Full Release Gate
 *
 * Executes the complete ordered validation pipeline required for v0.2.0-rc.1.
 *
 * Pipeline order (Phase 15):
 *   1.  Schema Validation
 *   2.  Runtime Tests
 *   3.  CLI Tests
 *   4.  SDK Tests
 *   5.  Lint Tests
 *   6.  Graph Tests
 *   7.  Context Tests
 *   8.  Compatibility Tests
 *   9.  Snapshot Tests
 *   10. Security Tests
 *   11. Performance Benchmarks (informational — never blocks)
 *   12. Documentation Validation
 *   13. VitePress Build
 *
 * Usage:
 *   npm run validate
 */

'use strict';

const { execSync, spawnSync } = require('child_process');
const path = require('path');

const ROOT = path.join(__dirname, '..');

// ── helpers ────────────────────────────────────────────────────────────────

function run(label, command, options = {}) {
  const { cwd = ROOT, optional = false } = options;
  const shortCwd = path.relative(ROOT, cwd) || '.';

  process.stdout.write(`  Running: ${command}`);
  if (shortCwd !== '.') process.stdout.write(` (in ${shortCwd})`);
  process.stdout.write('\n');

  try {
    execSync(command, { cwd, stdio: 'inherit', env: process.env });
  } catch (e) {
    if (optional) {
      console.warn(`  ⚠ ${label} failed (informational — not blocking): ${e.message}`);
      return false;
    }
    console.error(`\n  ✗ ${label} FAILED`);
    throw e;
  }

  return true;
}

// ── main pipeline ──────────────────────────────────────────────────────────

const steps = [
  {
    id: 1,
    label: 'Schema Validation',
    fn: () => run('Schema Validation', 'node website/scripts/validate-json.js')
  },
  {
    id: 2,
    label: 'Runtime Tests',
    fn: () => run('Runtime Tests', 'npm test', { cwd: path.join(ROOT, 'runtime') })
  },
  {
    id: 3,
    label: 'CLI Tests',
    fn: () => run('CLI Tests', 'npm test', { cwd: path.join(ROOT, 'cli') })
  },
  {
    id: 4,
    label: 'SDK Tests',
    fn: () => run('SDK Tests', 'npm test', { cwd: path.join(ROOT, 'sdk') })
  },
  {
    id: 5,
    label: 'Lint Tests',
    fn: () => run('Lint Tests', 'npm test', { cwd: path.join(ROOT, 'lint') })
  },
  {
    id: 6,
    label: 'Graph Tests',
    fn: () => run('Graph Tests', 'npm test', { cwd: path.join(ROOT, 'graph') })
  },
  {
    id: 7,
    label: 'Context Tests',
    fn: () => run('Context Tests', 'npm test', { cwd: path.join(ROOT, 'context') })
  },
  {
    id: 8,
    label: 'Compatibility Tests',
    fn: () => run('Compatibility Tests', 'node --test compatibility/v0.1-cli.test.js compatibility/v0.1-runtime.test.js compatibility/v0.1-sdk.test.js compatibility/v0.2-context.test.js compatibility/v0.2-graph.test.js')
  },
  {
    id: 9,
    label: 'Snapshot Tests',
    fn: () => run('Snapshot Tests', 'node --test tests/snapshots/snapshot.test.js')
  },
  {
    id: 10,
    label: 'Security Tests',
    fn: () => run('Security Tests', 'node --test security/fuzz/tests/security.test.js')
  },
  {
    id: 11,
    label: 'Performance Benchmarks',
    optional: true,
    fn: () => run('Performance Benchmarks', 'node benchmarks/run-benchmarks.js', { optional: true })
  },
  {
    id: 12,
    label: 'Documentation Validation',
    fn: () => run('Documentation Validation', 'node scripts/validate-docs.js')
  },
  {
    id: 13,
    label: 'VitePress Build',
    fn: () => run('VitePress Build', 'npx vitepress build website')
  }
];

const total = steps.length;

console.log('');
console.log('═══════════════════════════════════════════════════════');
console.log('          OWIS Validation Pipeline (v0.2.0-rc.1)      ');
console.log('═══════════════════════════════════════════════════════');
console.log('');

let passed = 0;
let skipped = 0;

for (const step of steps) {
  const tag = step.optional ? ' (informational)' : '';
  console.log(`\n[${step.id}/${total}] ${step.label}${tag}`);
  console.log('─'.repeat(55));

  try {
    const ok = step.fn();
    if (ok === false && step.optional) {
      console.log(`  ⚠ ${step.label} skipped/failed (non-blocking)`);
      skipped++;
    } else {
      console.log(`  ✓ ${step.label} passed`);
      passed++;
    }
  } catch (e) {
    console.error(`\n  ✗ Pipeline failed at step [${step.id}/${total}]: ${step.label}`);
    console.error(`  Error: ${e.message}`);
    console.log('');
    console.log('═══════════════════════════════════════════════════════');
    console.log('  ✗ Validation FAILED                                  ');
    console.log('═══════════════════════════════════════════════════════');
    process.exit(1);
  }
}

console.log('');
console.log('═══════════════════════════════════════════════════════');
console.log(`  ✓ All gates passed! (${passed} passed, ${skipped} informational)`);
console.log('  Repository is ready to tag v0.2.0-rc.1              ');
console.log('═══════════════════════════════════════════════════════');
console.log('');
