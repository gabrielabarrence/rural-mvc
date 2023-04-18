const Sequelize = require("sequelize");

const dbName = process.env.DB_NAME; // put .env data in the constants
const dbUser = process.env.DB_USER;
const dbHost = process.env.DB_HOST;
const dbPassword = process.env.DB_PASS;

const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
  //pass to sequelize
  dialect: "mysql", //DB type
  host: dbHost, //DB host
});

module.exports = sequelize;
