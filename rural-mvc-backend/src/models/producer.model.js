//calling Sequelize and configuring the database

const { DataTypes } = require("sequelize");
const sequelize = require("../../config/db.config");

const Producers = sequelize.define("producers", {
  id_producer: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },

  first_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  last_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  phone: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  is_active: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
});

module.exports = Producers;
