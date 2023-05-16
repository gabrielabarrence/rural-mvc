//calling Sequelize and configuring the database

const { DataTypes } = require("sequelize");
const sequelize = require("../../config/db.config");
const baseUnit = require("./baseunit.model");
const Stock = require("./stock.model");

const Products = sequelize.define("products", {
  id_product: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },

  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  sale_price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },

  id_baseunit: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  id_stock: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

Products.belongsTo(baseUnit, {
  foreignKey: "id_baseunit",
  sourceKey: "id_baseunit",
});

baseUnit.hasMany(Products, {
  foreignKey: "id_baseunit",
  sourceKey: "id_baseunit",
});

Products.belongsTo(Stock, {
  foreignKey: "id_stock",
  sourceKey: "id_stock",
});

Stock.hasOne(Products, {
  foreignKey: "id_stock",
  sourceKey: "id_stock",
});

module.exports = Products;
