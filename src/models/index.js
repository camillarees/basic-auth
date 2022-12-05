'use strict';

require('dotenv').config();
const { Sequelize, DataTypes } = require('sequelize');
const usersSchema = require('./users.schema');

// dynamic database url for testing vs development
const DATABASE_URL = process.env.NODE_ENV === 'test'
  ? 'sqlite:memory'
  : process.env.DATABASE_URL;

// instantiating database
const sequelizeDatabase = new Sequelize(DATABASE_URL);

const UsersModel = usersSchema(sequelizeDatabase, DataTypes);

module.exports = {sequelizeDatabase, UsersModel};
