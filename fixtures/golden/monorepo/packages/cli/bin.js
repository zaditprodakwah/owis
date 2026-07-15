#!/usr/bin/env node
// CLI entry point for monorepo-workspace
const { coreFunction } = require('../core');
console.log(coreFunction(process.argv[2]));
