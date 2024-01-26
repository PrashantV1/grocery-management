const { DataTypes } = require('sequelize');
const sequelize = require('../appConfig/dbConfig');

const Users = sequelize.define('Users', {
    email: {
        uniqueKey: true,
        type: DataTypes.STRING,
        allowNull: false,
      },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  salt:{
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Users;
