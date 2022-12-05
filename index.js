'use strict';

let { sequelize } =  require('./src/server');

// make sure our tables are created, start up the HTTP server.
sequelize.sync()
  .then(() => {
    console.log('server up');
  }).catch(e => {
    console.error('Could not start server', e.message);
  });
