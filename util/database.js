const Sequelize = require("sequelize");

const sequelize = new Sequelize("expenses", "root", "Nikku@2023", {
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelize;
