//calling Sequelize and configuring the database

const { DataTypes } = require("sequelize");
const sequelize = require("../../config/db.config");
const customer = require("./customer.model");
const producer = require("./producer.model");
const product = require("./product.model");

const Sales = sequelize.define("sales", {
  id_sale: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },

  id_producer: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  id_customer: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  is_done: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
});

Sales.belongsTo(customer, {
  foreignKey: "id_customer",
  sourceKey: "id_customer",
});

Sales.belongsTo(producer, {
  foreignKey: "id_producer",
  sourceKey: "id_producer",
});

//relation table
Sales.belongsToMany(product, {
  through: "relation_sales_product",
});

product.belongsToMany(Sales, {
  through: "relation_sales_product",
});

customer.hasMany(Sales, {
  foreignKey: "id_customer",
  sourceKey: "id_customer",
});

producer.hasMany(Sales, {
  foreignKey: "id_producer",
  sourceKey: "id_producer",
});

module.exports = Sales;
