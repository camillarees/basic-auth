'use strict';

const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const basicAuth = require('./middleware/basic');
const { UsersModel } = require('./models');

router.post('/signup', async (req, res) => {
  try {
    req.body.password = await bcrypt.hash(req.body.password, 10);
    const record = await UsersModel.create(req.body);
    res.status(200).json(record);
  } catch (e) { res.status(403).send('Error Creating User'); }
});


router.post('signin', basicAuth, (req, res, next) => {
  res.status(200).send(req.user);
});

module.exports = router;

