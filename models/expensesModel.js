const mongoose = require("mongoose");

const expensesSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model("Expenses", expensesSchema);

// const Sequelize = require("sequelize");
// const sequelize = require("../util/database");

// const Expenses = sequelize.define("expenses", {
//   id: {
//     type: Sequelize.INTEGER,
//     allowNull: false,
//     autoIncrement: true,
//     primaryKey: true,
//   },

//   amount: {
//     type: Sequelize.INTEGER,
//     allowNull: false,
//   },

//   description: {
//     type: Sequelize.STRING,
//     allowNull: false,
//   },

//   category: {
//     type: Sequelize.STRING,
//     allowNull: false,
//   },
// });

// module.exports = Expenses;
