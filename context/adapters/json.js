module.exports = {
  supports: (context) => !!context && context.contextVersion,
  serialize: (context) => {
    return JSON.stringify(context, null, 2);
  }
};
