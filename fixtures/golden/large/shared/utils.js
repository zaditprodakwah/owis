// Shared utilities for large-fullstack-app
function formatDate(date) {
  return new Date(date).toISOString();
}

function parseId(id) {
  return parseInt(id, 10);
}

module.exports = { formatDate, parseId };
