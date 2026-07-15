// scripts/validate-release.js
// Validation script for OWIS monorepo release readiness.
// Checks Changesets config, npm registry, linked packages, runs npm pack.

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

function fail(msg) {
  console.error('[FAIL]', msg);
  process.exit(1);
}

// 1. Verify .npmrc registry
const npmrcPath = path.resolve(__dirname, '..', '.npmrc');
if (!fs.existsSync(npmrcPath)) fail('.npmrc not found');
const npmrc = fs.readFileSync(npmrcPath, 'utf8').trim();
if (!npmrc.startsWith('registry=https://registry.npmjs.org/')) {
  fail('npm registry must be https://registry.npmjs.org/');
}
console.log('[OK] npm registry config');

// 2. Verify Changesets config
const csConfigPath = path.resolve(__dirname, '..', '.changeset', 'config.json');
if (!fs.existsSync(csConfigPath)) fail('.changeset/config.json not found');
const cs = JSON.parse(fs.readFileSync(csConfigPath, 'utf8'));
if (cs.baseBranch !== 'main') fail(`baseBranch should be "main", got "${cs.baseBranch}"`);
if (cs.access !== 'public') fail('access must be "public"');
if (cs.commit !== false) fail('commit must be false');
if (cs.updateInternalDependencies !== 'patch') fail('updateInternalDependencies must be "patch"');
console.log('[OK] Changesets config values');

const required = [
  '@prodakwah/owis',
  '@prodakwah/owis-runtime',
  '@prodakwah/owis-sdk',
  '@prodakwah/owis-cli',
  '@prodakwah/owis-lint',
  '@prodakwah/owis-graph',
  '@prodakwah/owis-context'
];
const linked = cs.linked && cs.linked[0];
if (!linked || required.some(p => !linked.includes(p))) {
  fail('Linked packages missing or incorrect in Changesets config');
}
console.log('[OK] All required linked packages present');

// 3. Run npm pack for all workspaces
try {
  execSync('npm pack --workspaces', { stdio: 'inherit' });
  console.log('[OK] npm pack succeeded');
} catch (e) {
  fail('npm pack failed');
}

// 4. Run changeset status to ensure no pending bumps
try {
  execSync('npx changeset status', { stdio: 'inherit' });
  console.log('[OK] changeset status clean');
} catch (e) {
  fail('changeset status reported issues');
}

console.log('Release validation completed successfully.');
