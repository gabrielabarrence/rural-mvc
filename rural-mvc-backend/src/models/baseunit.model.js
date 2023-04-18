//calling Sequelize and configuring the database

const { DataTypes } = require("sequelize");
const sequelize = require("../../config/db.config");

const BaseUnit = sequelize.define("baseUnit", {
  id_baseunit: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },

  unit_type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = BaseUnit;
