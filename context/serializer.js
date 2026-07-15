const fs = require('fs');
const path = require('path');

const jsonAdapter = require('./adapters/json');
const markdownAdapter = require('./adapters/markdown');
const genericAdapter = require('./adapters/generic');

// Stubs for future adapters
const openaiAdapter = require('./adapters/openai');
const anthropicAdapter = require('./adapters/anthropic');
const langchainAdapter = require('./adapters/langchain');
const crewaiAdapter = require('./adapters/crewai');
const autogenAdapter = require('./adapters/autogen');

const adapters = {
  json: jsonAdapter,
  markdown: markdownAdapter,
  generic: genericAdapter,
  openai: openaiAdapter,
  anthropic: anthropicAdapter,
  langchain: langchainAdapter,
  crewai: crewaiAdapter,
  autogen: autogenAdapter
};

function serializeContext(context, format = 'json') {
  const adapter = adapters[format.toLowerCase()];
  if (!adapter) {
    throw new Error(`Unsupported context format or adapter: ${format}`);
  }
  
  if (!adapter.supports(context)) {
    throw new Error(`Adapter ${format} does not support this context payload.`);
  }
  
  return adapter.serialize(context);
}

module.exports = {
  serializeContext,
  adapters
};
