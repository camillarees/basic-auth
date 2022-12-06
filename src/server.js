'use strict';

// 3rd Party Resources
const express = require('express');
const authRouter = require('./auth/router');

// Prepare the express app
const app = express();

const routes = require('./auth/router');

// Process JSON input and put the data on req.body
app.use(express.json());

// Process FORM intput and put the data on req.body
app.use(express.urlencoded({ extended: true }));

app.get('/', routes);

app.use(authRouter);

module.exports = {
  app,
  start: () => app.listen(3000, () => console.log(`server up`)),
};

