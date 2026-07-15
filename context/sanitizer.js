const limits = require('./limits');

/**
 * Context Sanitization Pipeline
 */

function redactSecrets(context, diagnostics) {
  const secretPattern = /(?:api[_-]?key|token|password|secret|credential|auth)[^a-zA-Z0-9]*(?:[:=]\s*)?["']?([a-zA-Z0-9\-_]{16,})["']?/ig;
  
  const str = JSON.stringify(context);
  if (secretPattern.test(str)) {
    diagnostics.push({ stage: 'Secret Redaction', message: 'Potential secrets detected and redacted.' });
    const sanitizedStr = str.replace(secretPattern, (match, p1) => match.replace(p1, '[REDACTED]'));
    return JSON.parse(sanitizedStr);
  }
  return context;
}

function filterPaths(context, diagnostics) {
  // Redact absolute user home paths
  const str = JSON.stringify(context);
  const homePattern = /(?:\/Users\/|\/home\/)[a-zA-Z0-9_-]+/g;
  if (homePattern.test(str)) {
    diagnostics.push({ stage: 'Path Filtering', message: 'Absolute home paths redacted.' });
    const sanitizedStr = str.replace(homePattern, '~');
    return JSON.parse(sanitizedStr);
  }
  return context;
}

function detectPromptInjection(context, diagnostics) {
  const injectionPattern = /(ignore all previous instructions|system prompt|you are a|bypass constraints)/ig;
  const metaStr = JSON.stringify(context.metadata || {});
  
  if (injectionPattern.test(metaStr)) {
    diagnostics.push({ stage: 'Prompt Injection Detection', message: 'Potential prompt injection detected in metadata. Metadata cleared.' });
    context.metadata = { _redacted: "Prompt injection signature detected" };
  }
  return context;
}

function enforceBudget(context, diagnostics) {
  let truncated = false;
  
  // 1. Files / Graph Nodes
  if (context.graph && context.graph.nodes && context.graph.nodes.length > limits.MAX_GRAPH_NODES) {
    context.graph.nodes = context.graph.nodes.slice(0, limits.MAX_GRAPH_NODES);
    truncated = true;
    diagnostics.push({ stage: 'Budget Enforcement', message: `Graph nodes truncated to ${limits.MAX_GRAPH_NODES}.` });
  }

  // 2. Metadata size
  let metaStr = JSON.stringify(context.metadata || {});
  if (Buffer.byteLength(metaStr, 'utf8') > limits.MAX_METADATA_SIZE_BYTES) {
    context.metadata = { _redacted: `Metadata exceeded ${limits.MAX_METADATA_SIZE_BYTES} bytes limit.` };
    truncated = true;
    diagnostics.push({ stage: 'Budget Enforcement', message: `Metadata truncated due to size limits.` });
  }

  // 3. Overall Serialization Size limit logic
  // Deterministic truncation priority:
  // 1. Workspace metadata (lowest priority to drop)
  // 2. Constraints
  // 3. Quality summary
  // 4. Graph summary
  // 5. Graph details (highest priority to drop)
  
  const checkSize = (ctx) => Buffer.byteLength(JSON.stringify(ctx), 'utf8');

  if (checkSize(context) > limits.MAX_SERIALIZED_CONTEXT_SIZE_BYTES) {
    // Drop Graph Details
    if (context.graph.nodes && context.graph.nodes.length > 0) {
      context.graph.nodes = [];
      context.graph.edges = [];
      truncated = true;
      diagnostics.push({ stage: 'Budget Enforcement', message: `Graph details dropped to satisfy total context size limit.` });
    }
  }

  if (checkSize(context) > limits.MAX_SERIALIZED_CONTEXT_SIZE_BYTES) {
    // Drop Quality
    context.quality = {};
    truncated = true;
    diagnostics.push({ stage: 'Budget Enforcement', message: `Quality report dropped to satisfy total context size limit.` });
  }

  if (checkSize(context) > limits.MAX_SERIALIZED_CONTEXT_SIZE_BYTES) {
    // Drop Constraints
    context.constraints = {};
    truncated = true;
    diagnostics.push({ stage: 'Budget Enforcement', message: `Constraints dropped to satisfy total context size limit.` });
  }

  if (checkSize(context) > limits.MAX_SERIALIZED_CONTEXT_SIZE_BYTES) {
    // Ultimate fallback
    context.metadata = {};
    diagnostics.push({ stage: 'Budget Enforcement', message: `Metadata dropped to satisfy total context size limit.` });
  }

  context._truncated = truncated;
  return context;
}

function sanitizeContext(context) {
  const diagnostics = [];
  
  // Clone to ensure immutability of the original input
  let sanitized = JSON.parse(JSON.stringify(context));

  sanitized = redactSecrets(sanitized, diagnostics);
  sanitized = filterPaths(sanitized, diagnostics);
  sanitized = detectPromptInjection(sanitized, diagnostics);
  sanitized = enforceBudget(sanitized, diagnostics);
  
  return {
    context: sanitized,
    diagnostics
  };
}

module.exports = {
  sanitizeContext
};
