'use strict';

// Create a Sequelize model

const UsersModel = (sequelize, DataTypes) => sequelize.define('UsersModel', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = UsersModel;
