//calling Sequelize and configuring the database

const { DataTypes } = require("sequelize");
const sequelize = require("../../config/db.config");
const customer = require("./customer.model");
const producer = require("./producer.model");
const product = require("./product.model");

const Stock = sequelize.define("stock", {
  id_stock: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },

  in_stock: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },

  quantity: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },

  quantity_reserved: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
});

module.exports = Stock;
