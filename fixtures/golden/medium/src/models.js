// Data models for medium-nodejs-api
const items = [];

function getItems() {
  return items;
}

function createItem(data) {
  const item = { id: Date.now(), ...data };
  items.push(item);
  return item;
}

module.exports = { getItems, createItem };
