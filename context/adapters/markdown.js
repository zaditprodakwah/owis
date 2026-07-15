module.exports = {
  supports: (context) => !!context && context.contextVersion,
  serialize: (context) => {
    let md = `# Workspace Context Intelligence (v${context.contextVersion})\n\n`;
    md += `*Generated At: ${context.generatedAt}*\n\n`;

    // 1. Workspace Info
    if (context.workspace) {
      md += `## 1. Workspace: ${context.workspace.name}\n`;
      if (context.workspace.description) md += `${context.workspace.description}\n`;
      if (context.workspace.version) md += `**Version:** ${context.workspace.version}\n`;
      if (context.workspace.languages && context.workspace.languages.length > 0) {
        md += `**Languages:** ${context.workspace.languages.join(', ')}\n`;
      }
      md += `\n`;
    }

    // 2. Architecture
    if (context.architecture) {
      md += `## 2. Architecture\n`;
      if (context.architecture.style) md += `**Style:** ${context.architecture.style}\n`;
      if (context.architecture.layers && context.architecture.layers.length > 0) {
        md += `**Layers:**\n`;
        context.architecture.layers.forEach(l => {
          md += `- ${l}\n`;
        });
      }
      if (context.architecture.patterns && context.architecture.patterns.length > 0) {
        md += `**Patterns:** ${context.architecture.patterns.join(', ')}\n`;
      }
      md += `\n`;
    }

    // 3. Constraints
    if (context.constraints && Object.keys(context.constraints).length > 0) {
      md += `## 3. Constraints\n`;
      md += "```json\n" + JSON.stringify(context.constraints, null, 2) + "\n```\n\n";
    }

    // 4. Graph
    if (context.graph) {
      md += `## 4. Graph Topology\n`;
      const { nodes, edges } = context.graph;
      if (nodes && nodes.length > 0) {
        md += `Nodes: ${nodes.length}, Edges: ${edges ? edges.length : 0}\n\n`;
        md += `### Node List (Truncated/Summary)\n`;
        nodes.forEach(n => {
          md += `- \`${n.id}\` (${n.type})\n`;
        });
      } else {
        md += `*Graph details omitted or empty.*\n`;
      }
      md += `\n`;
    }

    // 5. Quality
    if (context.quality && Object.keys(context.quality).length > 0) {
      md += `## 5. Quality Profile\n`;
      md += "```json\n" + JSON.stringify(context.quality, null, 2) + "\n```\n\n";
    }

    // 6. Metadata
    if (context.metadata && Object.keys(context.metadata).length > 0) {
      md += `## 6. Metadata\n`;
      md += "```json\n" + JSON.stringify(context.metadata, null, 2) + "\n```\n\n";
    }

    if (context._truncated) {
      md += `> **Note:** This context has been truncated to satisfy budget enforcement rules.\n`;
    }

    return md;
  }
};
