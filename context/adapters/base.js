class NotImplementedError extends Error {
  constructor(adapterName) {
    super(`Adapter '${adapterName}' is reserved but not yet implemented.`);
    this.name = 'NotImplementedError';
  }
}

module.exports = { NotImplementedError };
