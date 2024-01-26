const { DataTypes } = require('sequelize');
const sequelize = require('../appConfig/dbConfig');

const GroceryOrders = sequelize.define('GroceryOrders', {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  amount: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  items: {
    type: DataTypes.JSON,
    allowNull: false,
  },
});

module.exports = GroceryOrders;

