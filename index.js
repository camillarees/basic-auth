'use strict';

require('dotenv').config();

const { start } = require('./src/server');
let { sequelize } =  require('./src/auth/models');

// make sure our tables are created, start up the HTTP server.
sequelize.sync()
  .then(() => {
    start();
    console.log('successful connection');
  })
  .catch(e => console.error(e));
