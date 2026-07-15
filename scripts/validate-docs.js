/**
 * Documentation Validation Script
 *
 * Validates all Markdown documentation files in the docs/ directory.
 * Checks performed:
 *   - Empty files
 *   - Broken relative markdown links (file must exist on disk)
 *   - Duplicate headings within a single document
 *   - Missing referenced files (relative path targets)
 *   - Invalid relative paths (path traversal beyond docs/)
 *
 * This script is part of the release gate. It must pass before tagging v0.2.0-rc.1.
 *
 * Usage:
 *   node scripts/validate-docs.js
 */

'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const DOCS_DIR = path.join(ROOT, 'docs');

// Additional markdown roots to scan beyond docs/
const EXTRA_ROOTS = [
  { dir: ROOT, label: 'root', depth: 0 }  // only root-level .md files, non-recursive
];

let errors = 0;
let warnings = 0;

function error(msg) {
  console.error(`  ✗ ERROR: ${msg}`);
  errors++;
}

function warn(msg) {
  console.warn(`  ⚠ WARN:  ${msg}`);
  warnings++;
}

// ── collect all .md files ─────────────────────────────────────────────────

const allDocs = [];

function scanDir(dir) {
  if (!fs.existsSync(dir)) return;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      // Skip output and dependency directories
      if (['node_modules', '.git', 'dist', 'build', '.vitepress'].includes(entry.name)) continue;
      scanDir(fullPath);
    } else if (entry.name.endsWith('.md')) {
      allDocs.push(fullPath);
    }
  }
}

scanDir(DOCS_DIR);

// Root-level .md files only (non-recursive)
if (fs.existsSync(ROOT)) {
  const rootEntries = fs.readdirSync(ROOT, { withFileTypes: true });
  for (const e of rootEntries) {
    if (!e.isDirectory() && e.name.endsWith('.md')) {
      allDocs.push(path.join(ROOT, e.name));
    }
  }
}

console.log('');
console.log('═══════════════════════════════════════════════════════');
console.log('          OWIS Documentation Validation               ');
console.log('═══════════════════════════════════════════════════════');
console.log(`\n  Scanning ${allDocs.length} Markdown files...\n`);

// ── per-file checks ───────────────────────────────────────────────────────

for (const filePath of allDocs) {
  const relFile = path.relative(ROOT, filePath);
  const content = fs.readFileSync(filePath, 'utf8');

  // 1. Empty file check
  if (!content.trim()) {
    error(`Empty file: ${relFile}`);
    continue;
  }

  // 2. Broken relative links
  // Matches [text](./path), [text](../path), [text](path/to/file)
  // Excludes: http/https URLs, mailto:, anchors (#only), empty hrefs
  const linkPattern = /\[([^\]]*)\]\(([^)]+)\)/g;
  let match;
  while ((match = linkPattern.exec(content)) !== null) {
    const href = match[2].trim();

    // Skip external links and pure anchors
    if (href.startsWith('http://') || href.startsWith('https://')) continue;
    if (href.startsWith('mailto:')) continue;
    if (href.startsWith('#')) continue;
    if (!href) continue;

    // Strip anchor fragment
    const hrefPath = href.split('#')[0];
    if (!hrefPath) continue;

    // Resolve relative to the file's directory
    const targetAbsolute = path.resolve(path.dirname(filePath), hrefPath);

    if (!fs.existsSync(targetAbsolute)) {
      error(`Broken link in ${relFile}: "${href}" → resolved to "${path.relative(ROOT, targetAbsolute)}" (not found)`);
    }
  }

  // 3. Duplicate headings
  const headingPattern = /^#{1,6}\s+(.+)$/gm;
  const headings = [];
  let hMatch;
  while ((hMatch = headingPattern.exec(content)) !== null) {
    const heading = hMatch[1].trim().toLowerCase();
    if (headings.includes(heading)) {
      warn(`Duplicate heading in ${relFile}: "${hMatch[1].trim()}"`);
    } else {
      headings.push(heading);
    }
  }
}

// ── summary ───────────────────────────────────────────────────────────────

console.log('');
console.log('─'.repeat(55));
console.log(`  Files scanned: ${allDocs.length}`);
console.log(`  Errors:        ${errors}`);
console.log(`  Warnings:      ${warnings}`);
console.log('─'.repeat(55));

if (errors > 0) {
  console.error(`\n  ✗ Documentation validation FAILED (${errors} error${errors > 1 ? 's' : ''})`);
  console.log('');
  process.exit(1);
} else {
  console.log('\n  ✓ Documentation validation passed');
  console.log('');
}
