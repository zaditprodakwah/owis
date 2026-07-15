module.exports = {
  supports: (context) => !!context && context.contextVersion,
  serialize: (context) => {
    return context; // For generic, we just return the object representation
  }
};
