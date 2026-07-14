const fs = require('fs');
const path = require('path');

function scanDirectory(baseDir, excludeDirs = ['node_modules', '.git', 'dist', 'cache']) {
  const files = [];
  let dirsCount = 0;

  function walk(currentDir) {
    const list = fs.readdirSync(currentDir);
    list.forEach(item => {
      if (excludeDirs.includes(item)) return;
      const fullPath = path.join(currentDir, item);
      const stat = fs.statSync(fullPath);
      if (stat.isDirectory()) {
        dirsCount++;
        walk(fullPath);
      } else {
        files.push({
          relPath: path.relative(baseDir, fullPath),
          size: stat.size,
          ext: path.extname(item).toLowerCase()
        });
      }
    });
  }

  walk(baseDir);
  return { files, dirsCount };
}

function parseWorkspace(workspacePath) {
  const absolutePath = path.resolve(workspacePath);
  if (!fs.existsSync(absolutePath)) {
    throw new Error(`Workspace path does not exist: ${absolutePath}`);
  }

  // Scan directory
  const { files, dirsCount } = scanDirectory(absolutePath);

  // Detect tech stack
  const languages = new Set();
  const frameworks = new Set();
  const packageManagers = new Set();

  files.forEach(f => {
    if (f.ext === '.js' || f.ext === '.mjs' || f.ext === '.cjs') languages.add('JavaScript');
    if (f.ext === '.ts') languages.add('TypeScript');
    if (f.ext === '.md') languages.add('Markdown');
    if (f.ext === '.json') languages.add('JSON');
    if (f.ext === '.py') languages.add('Python');
    if (f.ext === '.go') languages.add('Go');

    if (f.relPath === 'package.json') {
      packageManagers.add('npm');
      const pkg = JSON.parse(fs.readFileSync(path.join(absolutePath, f.relPath), 'utf8'));
      if (pkg.dependencies) {
        if (pkg.dependencies.vitepress) frameworks.add('VitePress');
        if (pkg.dependencies.vue) frameworks.add('Vue');
        if (pkg.dependencies.react) frameworks.add('React');
        if (pkg.dependencies.next) frameworks.add('Next.js');
      }
      if (pkg.devDependencies) {
        if (pkg.devDependencies.vitepress) frameworks.add('VitePress');
        if (pkg.devDependencies.vue) frameworks.add('Vue');
      }
    }
  });

  // Load config if exists
  let config = { name: path.basename(absolutePath), version: "0.1.0" };
  const configPath = path.join(absolutePath, 'workspace.json');
  if (fs.existsSync(configPath)) {
    config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
  }

  // Classify Source of Truth Tiers
  const primarySoT = [];
  const secondarySoT = [];
  const referenceDocs = [];

  files.forEach(f => {
    if (f.ext === '.md') {
      if (f.relPath.includes('00-CONSTITUTION/') || f.relPath === 'README.md') {
        primarySoT.push(f.relPath);
      } else if (f.relPath.includes('01-FOUNDATION/') || f.relPath.includes('10-SPEC/')) {
        secondarySoT.push(f.relPath);
      } else {
        referenceDocs.push(f.relPath);
      }
    }
  });

  // Construct WIR Model
  return {
    workspace: {
      root: absolutePath,
      scanned_files: files.length,
      scanned_directories: dirsCount,
      ignored_paths: ['node_modules', '.git', 'dist', 'cache'],
      supported_formats: ['.md', '.json', '.js', '.mjs'],
      generated_at: new Date().toISOString()
    },
    project: {
      name: config.name,
      description: "Auto-generated workspace report by OWIS Reference Runtime",
      version: config.version,
      maturity: "Draft",
      repository_type: "git",
      domain: "software-development",
      objectives: ["Workspace discovery", "Ontology mapping"],
      stakeholders: ["AI Agents", "Human Developers"]
    },
    source_of_truth: {
      primary: primarySoT,
      secondary: secondarySoT,
      reference: referenceDocs,
      temporary: []
    },
    knowledge: {
      glossary: {
        "OWIS": "Open Workspace Intelligence Specification",
        "WIR": "Workspace Intelligence Report",
        "UARS": "Universal Agent Runtime Specification"
      },
      terminology: {
        "workspace": "The logical root folder containing software artifacts"
      },
      concepts: ["Ontology Mapping", "Workspace Intelligence"],
      business_rules: [],
      assumptions: []
    },
    architecture: {
      style: frameworks.has('VitePress') ? 'Static Documentation Portal' : 'Monolithic Codebase',
      patterns: ["Documentation-driven Design"],
      bounded_contexts: ["Core Spec", "Website"],
      modules: files.slice(0, 10).map(f => ({ path: f.relPath, size: f.size })),
      services: [],
      packages: [],
      layers: ["Documentation", "Portal Assets"],
      workflows: []
    },
    technology: {
      languages: Array.from(languages),
      frameworks: Array.from(frameworks),
      runtimes: ["Node.js"],
      libraries: [],
      package_managers: Array.from(packageManagers)
    },
    contracts: {
      api: [],
      schema: [],
      interfaces: []
    },
    dependencies: {
      internal: [],
      external: []
    },
    confidence: {
      workspace: 0.9,
      architecture: 0.8,
      contracts: 0.8,
      overall: 0.85
    },
    execution: {
      readiness: "READY",
      blockers: [],
      recommended_scope: ["All components"],
      validation_required: [],
      next_action: null
    }
  };
}

module.exports = { parseWorkspace };
