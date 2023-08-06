const Sequelize = require("sequelize");

const sequelize = new Sequelize(
  process.env.SCHEMA_NAME,
  process.env.MYSQL_USERNAME,
  process.env.MYSQL_PASSWORD,
  {
    dialect: "mysql",
    host: process.env.HOST,
  }
);

module.exports = sequelize;
