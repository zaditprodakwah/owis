const { NotImplementedError } = require('./base');

module.exports = {
  supports: () => true,
  serialize: () => {
    throw new NotImplementedError('crewai');
  }
};
