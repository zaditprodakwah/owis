// API routes for medium-nodejs-api
const express = require('express');
const router = express.Router();
const { getItems, createItem } = require('./models');

router.get('/items', (req, res) => {
  res.json(getItems());
});

router.post('/items', (req, res) => {
  const item = createItem(req.body);
  res.status(201).json(item);
});

module.exports = router;
