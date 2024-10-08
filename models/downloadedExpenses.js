const mongoose = require("mongoose");

const downloadExpensesSchema = new mongoose.Schema({
  fileURL: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("DownloadedExpenses", downloadExpensesSchema);

// const Sequelize = require("sequelize");
// const sequelize = require("../util/database");

// const DownloadedExpenses = sequelize.define("downloaded_expenses", {
//   id: {
//     type: Sequelize.INTEGER,
//     allowNull: false,
//     autoIncrement: true,
//     primaryKey: true,
//   },

//   fileURL: {
//     type: Sequelize.STRING,
//     allowNull: false,
//   },
// });

// module.exports = DownloadedExpenses;
