'use strict';

const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const base64 = require('base-64');
const { Users } = require('./src/models');

// sequelize allows us to interact with the userModel BEFORE adding data to the database using the before Create hook
Users.beforeCreate(() => {
  console.log('user:', Users);
});

async function basicAuth(req, res, next) {
  let { authorization } = req.headers;
  console.log('authorization: ', authorization);

  if (!authorization) {
    res.status(401).send('Not Authorized!');
  } else {
    // console.log('I am here');
    let authString = authorization.split(' ')[1];
    console.log('authStr: ', authString);

    let decodedAuthString = base64.decode(authString);
    console.log('decodedAuthString: ', decodedAuthString);

    // extracting username and password from auth string
    let [username, password] = decodedAuthString.split(':');
    console.log('username: ', username);
    console.log('password: ', password);

    // find user in the database
    let user = await Users.findOne({ where: { username } });
    console.log('user from database', user);

    if (user) {
      let validUser = await bcrypt.compare(password, user.password);
      console.log('validUser', validUser);
      if (validUser) {
        req.user = user;
        next();

      } else {
        next('Not Authorized!');
      }
    }
  }
}

router.post('/signup', async (req, res) => {
  try {
    req.body.password = await bcrypt.hash(req.body.password, 10);
    const record = await Users.create(req.body);
    res.status(200).json(record);
  } catch (e) { res.status(403).send('Error Creating User'); }
});


router.post('/signin', basicAuth, async (req, res) => {
  let basicHeaderParts = req.headers.authorization.split(' ');  // ['Basic', 'sdkjdsljd=']
  let encodedString = basicHeaderParts.pop();  // sdkjdsljd=
  let decodedString = base64.decode(encodedString); // "username:password"
  let [username, password] = decodedString.split(':'); // username, password

  try {
    const user = await Users.findOne({ where: { username: username } });
    const valid = await bcrypt.compare(password, user.password);
    if (valid) {
      res.status(200).json(user);
    }
    else {
      throw new Error('Invalid User');
    }
  } catch (error) { res.status(403).send('Invalid Login'); }

});
