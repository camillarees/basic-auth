'use strict';

const bcrypt = require('bcrypt');
const base64 = require('base-64');
const { UsersModel } = require('../models');

module.exports = async (req, res, next) => {

  try {

    let basicHeaderParts = req.headers.authorization.split(' ');  // ['Basic', 'sdkjdsljd=']
    let encodedString = basicHeaderParts.pop();  // sdkjdsljd=
    let decodedString = base64.decode(encodedString); // "username:password"
    let [username, password] = decodedString.split(':'); // username, password

    const user = await UsersModel.findOne({ where: { username } });
    const valid = await bcrypt.compare(password, user.password);
    if (valid) {
      req.user = user;
      next();
    }
    else {
      next('Invalid User');
    }
  } catch (error) { next(error); }

};
