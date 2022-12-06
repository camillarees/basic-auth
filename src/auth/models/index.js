'use strict';

const { Sequelize, DataTypes } = require('sequelize');
const userSchema = require('./users-model');

// dynamic database url for testing vs development
const DATABASE_URL = 'sqlite::memory';
const sequelize = new Sequelize(DATABASE_URL);

const UsersModel = userSchema(sequelize, DataTypes);

module.exports = {
  sequelize,
  UsersModel,
};
