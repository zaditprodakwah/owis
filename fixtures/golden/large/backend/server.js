// Backend server for large-fullstack-app
const express = require('express');
const app = express();
app.use(express.json());
app.listen(3000);
module.exports = app;
