/**
 * Compatibility Test: v0.1 CLI Command Surface
 *
 * Verifies that the v0.1 CLI commands (scan, lint, context), flags (--help, --version),
 * and exit code semantics remain intact in v0.2. These tests execute the CLI binary
 * as a subprocess and assert on stdout patterns and exit codes.
 */
const test = require('node:test');
const assert = require('node:assert/strict');
const { execSync, spawnSync } = require('child_process');
const path = require('path');
const fs = require('fs');
const os = require('os');

const cliBin = path.join(__dirname, '../cli/bin/owis.js');
const fixtureSimple = path.join(__dirname, '../fixtures/golden/simple');
const nodeExe = process.execPath;

/**
 * Runs the CLI and returns { stdout, stderr, status }.
 */
function runCLI(args, options = {}) {
  const result = spawnSync(nodeExe, [cliBin, ...args], {
    encoding: 'utf8',
    timeout: 15000,
    ...options
  });
  return {
    stdout: result.stdout || '',
    stderr: result.stderr || '',
    status: result.status
  };
}

// ─── guard: CLI binary must exist ─────────────────────────────────────────
test('CLI binary exists', () => {
  assert.ok(fs.existsSync(cliBin), `CLI binary not found at: ${cliBin}`);
});

// ─── --help flag ──────────────────────────────────────────────────────────

test('v0.1 CLI: --help exits with code 0', () => {
  const { status } = runCLI(['--help']);
  assert.strictEqual(status, 0, '--help must exit with code 0');
});

test('v0.1 CLI: -h exits with code 0', () => {
  const { status } = runCLI(['-h']);
  assert.strictEqual(status, 0, '-h must exit with code 0');
});

test('v0.1 CLI: --help prints usage information', () => {
  const { stdout } = runCLI(['--help']);
  assert.ok(stdout.toLowerCase().includes('owis'), '--help must mention OWIS in output');
  assert.ok(stdout.includes('--help') || stdout.includes('-h'), '--help must mention help flag');
});

// ─── --version flag ────────────────────────────────────────────────────────

test('v0.1 CLI: --version exits with code 0', () => {
  const { status } = runCLI(['--version']);
  assert.strictEqual(status, 0, '--version must exit with code 0');
});

test('v0.1 CLI: -v exits with code 0', () => {
  const { status } = runCLI(['-v']);
  assert.strictEqual(status, 0, '-v must exit with code 0');
});

test('v0.1 CLI: --version prints a version string', () => {
  const { stdout } = runCLI(['--version']);
  // Must contain version number pattern like 0.x.x or v0.x.x
  assert.ok(/v?\d+\.\d+/.test(stdout.trim()), `--version output must contain a version number, got: "${stdout.trim()}"`);
});

// ─── scan command ─────────────────────────────────────────────────────────

test('v0.1 CLI: scan of valid workspace exits with code 0', () => {
  if (!fs.existsSync(fixtureSimple)) return;

  // Use a temp directory so we don't overwrite golden fixtures
  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'owis-compat-'));
  // Copy workspace.json into tmpDir
  const wsFile = path.join(fixtureSimple, 'workspace.json');
  if (fs.existsSync(wsFile)) {
    fs.copyFileSync(wsFile, path.join(tmpDir, 'workspace.json'));
  }

  const { status } = runCLI(['scan', tmpDir]);

  // Cleanup
  try { fs.rmSync(tmpDir, { recursive: true, force: true }); } catch (_) {}

  assert.strictEqual(status, 0, 'scan of valid workspace must exit with code 0');
});

test('v0.1 CLI: scan generates wir.json', () => {
  if (!fs.existsSync(fixtureSimple)) return;

  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'owis-compat-'));
  const wsFile = path.join(fixtureSimple, 'workspace.json');
  if (fs.existsSync(wsFile)) {
    fs.copyFileSync(wsFile, path.join(tmpDir, 'workspace.json'));
  }

  runCLI(['scan', tmpDir]);

  const wirPath = path.join(tmpDir, 'wir.json');
  const exists = fs.existsSync(wirPath);

  // Cleanup
  try { fs.rmSync(tmpDir, { recursive: true, force: true }); } catch (_) {}

  assert.ok(exists, 'scan must generate wir.json in workspace directory');
});

test('v0.1 CLI: scan generates wir.graph.json', () => {
  if (!fs.existsSync(fixtureSimple)) return;

  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'owis-compat-'));
  const wsFile = path.join(fixtureSimple, 'workspace.json');
  if (fs.existsSync(wsFile)) {
    fs.copyFileSync(wsFile, path.join(tmpDir, 'workspace.json'));
  }

  runCLI(['scan', tmpDir]);

  const graphPath = path.join(tmpDir, 'wir.graph.json');
  const exists = fs.existsSync(graphPath);

  // Cleanup
  try { fs.rmSync(tmpDir, { recursive: true, force: true }); } catch (_) {}

  assert.ok(exists, 'scan must generate wir.graph.json in workspace directory');
});

test('v0.1 CLI: scan stdout contains "COMPLIANT" for valid workspace', () => {
  if (!fs.existsSync(fixtureSimple)) return;

  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'owis-compat-'));
  const wsFile = path.join(fixtureSimple, 'workspace.json');
  if (fs.existsSync(wsFile)) {
    fs.copyFileSync(wsFile, path.join(tmpDir, 'workspace.json'));
  }

  const { stdout } = runCLI(['scan', tmpDir]);

  // Cleanup
  try { fs.rmSync(tmpDir, { recursive: true, force: true }); } catch (_) {}

  assert.ok(stdout.includes('COMPLIANT'), 'scan must print COMPLIANT for a valid workspace');
});

// ─── lint command ─────────────────────────────────────────────────────────

test('v0.1 CLI: lint command does not crash on a valid workspace', () => {
  if (!fs.existsSync(fixtureSimple)) return;

  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'owis-compat-'));
  const wsFile = path.join(fixtureSimple, 'workspace.json');
  if (fs.existsSync(wsFile)) {
    fs.copyFileSync(wsFile, path.join(tmpDir, 'workspace.json'));
  }

  const { status } = runCLI(['lint', tmpDir]);

  // Cleanup
  try { fs.rmSync(tmpDir, { recursive: true, force: true }); } catch (_) {}

  // Exit 0 (no errors) or 1 (lint errors) are both valid; anything else is a crash
  assert.ok(status === 0 || status === 1, `lint must exit with 0 or 1, got: ${status}`);
});

// ─── context command ───────────────────────────────────────────────────────

test('v0.1 CLI: context command generates context.json from a golden fixture', () => {
  if (!fs.existsSync(fixtureSimple)) return;

  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'owis-compat-'));

  // Copy all fixture files into tmpDir so context command has wir.json + wir.graph.json
  for (const file of ['workspace.json', 'wir.json', 'wir.graph.json']) {
    const src = path.join(fixtureSimple, file);
    if (fs.existsSync(src)) {
      fs.copyFileSync(src, path.join(tmpDir, file));
    }
  }

  const { status } = runCLI(['context', tmpDir]);
  const contextExists = fs.existsSync(path.join(tmpDir, 'context.json'));

  // Cleanup
  try { fs.rmSync(tmpDir, { recursive: true, force: true }); } catch (_) {}

  assert.strictEqual(status, 0, 'context command must exit with 0');
  assert.ok(contextExists, 'context command must generate context.json');
});

test('v0.1 CLI: context command generates context.md from a golden fixture', () => {
  if (!fs.existsSync(fixtureSimple)) return;

  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'owis-compat-'));

  for (const file of ['workspace.json', 'wir.json', 'wir.graph.json']) {
    const src = path.join(fixtureSimple, file);
    if (fs.existsSync(src)) {
      fs.copyFileSync(src, path.join(tmpDir, file));
    }
  }

  runCLI(['context', tmpDir]);
  const mdExists = fs.existsSync(path.join(tmpDir, 'context.md'));

  // Cleanup
  try { fs.rmSync(tmpDir, { recursive: true, force: true }); } catch (_) {}

  assert.ok(mdExists, 'context command must generate context.md');
});

// ─── --output flag ────────────────────────────────────────────────────────

test('v0.1 CLI: --output flag redirects wir.json to specified path', () => {
  if (!fs.existsSync(fixtureSimple)) return;

  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'owis-compat-'));
  const wsFile = path.join(fixtureSimple, 'workspace.json');
  if (fs.existsSync(wsFile)) {
    fs.copyFileSync(wsFile, path.join(tmpDir, 'workspace.json'));
  }

  const outputPath = path.join(tmpDir, 'custom-output.json');
  runCLI(['scan', tmpDir, '--output', outputPath]);

  const exists = fs.existsSync(outputPath);

  // Cleanup
  try { fs.rmSync(tmpDir, { recursive: true, force: true }); } catch (_) {}

  assert.ok(exists, '--output must create file at specified path');
});

// ─── implicit scan (no subcommand) ────────────────────────────────────────

test('v0.1 CLI: workspace path without subcommand defaults to scan', () => {
  if (!fs.existsSync(fixtureSimple)) return;

  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'owis-compat-'));
  const wsFile = path.join(fixtureSimple, 'workspace.json');
  if (fs.existsSync(wsFile)) {
    fs.copyFileSync(wsFile, path.join(tmpDir, 'workspace.json'));
  }

  // No 'scan' subcommand
  const { status } = runCLI([tmpDir]);

  // Cleanup
  try { fs.rmSync(tmpDir, { recursive: true, force: true }); } catch (_) {}

  assert.strictEqual(status, 0, 'Implicit scan must exit with 0 for a valid workspace');
});
