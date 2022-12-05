'use strict';

// 3rd Party Resources
const express = require('express');

// Prepare the express app
const app = express();

const routes = require('./routes/users');

// Process JSON input and put the data on req.body
app.use(express.json());

// Process FORM intput and put the data on req.body
app.use(express.urlencoded({ extended: true }));

app.get('/', routes);

module.exports = {
  app,
  start: (PORT) => {
    app.listen(PORT, () => console.log(`Server running on ${PORT}`));
  },
};
