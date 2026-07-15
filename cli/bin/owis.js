#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { parseWorkspace } = require('../../runtime/src/parser');
const { validate } = require('../../runtime/src/validator');

function deterministicStringify(obj) {
  if (Array.isArray(obj)) {
    return '[' + obj.map(deterministicStringify).join(',') + ']';
  } else if (obj !== null && typeof obj === 'object') {
    const keys = Object.keys(obj).sort();
    const props = keys.map(k => JSON.stringify(k) + ':' + deterministicStringify(obj[k]));
    return '{' + props.join(',') + '}';
  }
  return JSON.stringify(obj);
}

// Ensure proper spacing and lines
function stringifyPretty(obj) {
  const parsed = JSON.parse(deterministicStringify(obj));
  return JSON.stringify(parsed, null, 2);
}

const args = process.argv.slice(2);

function printHelp() {
  console.log(`
OWIS CLI Tool v0.2.0-rc.1

Usage:
  owis [command] [workspace-path] [options]

Commands:
  scan       (default) Scan workspace and generate WIR and Graph
  lint       Run linter on the workspace
  context    Generate LLM context files

Options:
  -o, --output <path>    Specify path to save the generated artifacts
  -h, --help             Show this help screen
  -v, --version          Show version details
`);
}

if (args.includes('-h') || args.includes('--help')) {
  printHelp();
  process.exit(0);
}

if (args.includes('-v') || args.includes('--version')) {
  console.log('OWIS CLI v0.1.0');
  process.exit(0);
}

// Find output path override
let outputPathOverride = null;
const outputIdx = args.findIndex(arg => arg === '-o' || arg === '--output');
if (outputIdx !== -1 && args[outputIdx + 1]) {
  outputPathOverride = args[outputIdx + 1];
  // Remove options from args
  args.splice(outputIdx, 2);
}

let command = 'scan';
if (args[0] === 'lint' || args[0] === 'scan' || args[0] === 'context') {
  command = args[0];
  args.shift();
}

const targetWorkspace = args[0] || process.cwd();

if (command === 'lint') {
  const { engine, formatter, loadDefaultRules } = require('../../lint');
  loadDefaultRules();

  try {
    const context = {}; // Currently not fully utilized but available for rules
    const wir = parseWorkspace(targetWorkspace);
    
    // We don't fail immediately on invalid WIR, we just pass to linter
    const result = engine.lint(context, wir);
    const output = formatter.formatCLI(result, path.resolve(targetWorkspace));
    
    console.log(output);
    
    // Non-zero exit code if score < 100 or errors present? 
    // Usually linter errors should fail the build
    const hasErrors = result.diagnostics.some(d => d.severity === 'ERROR');
    if (hasErrors) {
      process.exit(1);
    }
  } catch (err) {
    console.error('Linting failed:', err.message);
    process.exit(1);
  }
} else if (command === 'context') {
  const { buildContext, sanitizeContext, validateContext, serializeContext } = require('../../context');
  
  const sourcesMap = {};
  const payloads = {};
  
  const attemptLoad = (filename, key) => {
    const fullPath = path.join(path.resolve(targetWorkspace), filename);
    if (fs.existsSync(fullPath)) {
      try {
        payloads[key] = JSON.parse(fs.readFileSync(fullPath, 'utf8'));
        sourcesMap[key] = filename;
      } catch (e) {}
    }
  };

  attemptLoad('workspace.json', 'workspace');
  attemptLoad('wir.json', 'wir');
  attemptLoad('wir.graph.json', 'graph');
  attemptLoad('lint.json', 'lint');

  try {
    const rawContext = buildContext(payloads, sourcesMap);
    const { context: cleanContext, diagnostics } = sanitizeContext(rawContext);
    
    const valResult = validateContext(cleanContext);
    if (!valResult.valid) {
      console.error('Context validation failed:', valResult.errors);
      process.exit(1);
    }
    
    const outJson = serializeContext(cleanContext, 'json');
    const outMd = serializeContext(cleanContext, 'markdown');
    
    fs.writeFileSync(path.join(path.resolve(targetWorkspace), 'context.json'), outJson, 'utf8');
    fs.writeFileSync(path.join(path.resolve(targetWorkspace), 'context.md'), outMd, 'utf8');
    
    console.log('\nContext generated\n');
    console.log('Sources:');
    Object.values(sourcesMap).forEach(s => console.log(`✓ ${s}`));
    console.log('\nOutput:\n✓ context.json\n✓ context.md\n');
    console.log(`Warnings:\n${diagnostics.length}\n`);
    console.log(`Truncated:\n${cleanContext._truncated ? 'Yes' : 'No'}\n`);
    
  } catch (err) {
    console.error('Context generation failed:', err.message);
    process.exit(1);
  }
} else {
  // Default 'scan' command
  console.log('\nOWIS Workspace Validation\n');
  console.log(`Workspace:\n${path.resolve(targetWorkspace)}\n`);

  try {
    const wir = parseWorkspace(targetWorkspace);
    const wirVal = validate('wir', wir);
    if (!wirVal.valid) {
      console.log('Status:\nNON-COMPLIANT\n');
      console.error('Errors:', wirVal.errors);
      process.exit(1);
    }

    console.log('Detected:');
    if (wir.technology.languages && wir.technology.languages.length > 0) {
      wir.technology.languages.forEach(s => console.log(`✓ Language: ${s}`));
    }
    if (wir.technology.frameworks && wir.technology.frameworks.length > 0) {
      wir.technology.frameworks.forEach(s => console.log(`✓ Framework: ${s}`));
    }
    if (wir.source_of_truth.primary.length > 0 || wir.source_of_truth.secondary.length > 0) {
      console.log('✓ Documentation');
    }
    if (wir.technology.package_managers && wir.technology.package_managers.length > 0) {
      console.log(`✓ Package Metadata (${wir.technology.package_managers.join(', ')})`);
    }
    
    console.log('\nGenerated:');
    console.log('✓ WIR');

    const wirOutputPath = outputPathOverride 
      ? path.resolve(outputPathOverride) 
      : path.join(path.resolve(targetWorkspace), 'wir.json');

    fs.writeFileSync(wirOutputPath, stringifyPretty(wir), 'utf8');

    // Graph Extraction (Phase 14.2)
    const { parseGraph, analyzeGraph, serializeGraph } = require('../../graph');
    const graph = parseGraph(path.resolve(targetWorkspace), wir);
    const serializedGraph = serializeGraph(graph);
    const analysis = analyzeGraph(graph);
    
    const graphOutputPath = outputPathOverride
      ? path.resolve(outputPathOverride).replace(/\.json$/, '.graph.json')
      : path.join(path.resolve(targetWorkspace), 'wir.graph.json');
      
    fs.writeFileSync(graphOutputPath, stringifyPretty(serializedGraph), 'utf8');
    
    console.log('✓ WIR Graph');
    console.log(`  - Nodes: ${analysis.counts.nodes}`);
    console.log(`  - Edges: ${analysis.counts.edges}\n`);

    console.log('Status:\nCOMPLIANT\n');

  } catch (err) {
    console.log('Status:\nNON-COMPLIANT\n');
    console.error('Error:', err.message);
    process.exit(1);
  }
}
