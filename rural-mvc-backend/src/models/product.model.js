//calling Sequelize and configuring the database

const { DataTypes } = require("sequelize");
const sequelize = require("../../config/db.config");
const baseUnit = require("./baseunit.model");

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

  quantity: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },

  in_stock: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
  },

  is_reserved: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
  },

  id_baseunit: {
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

module.exports = Products;
