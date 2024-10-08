const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  mobileNo: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  isPremium: {
    type: Boolean,
    default: false,
  },
  totalExpenses: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("User", userSchema);

// const Sequelize = require("sequelize");
// const sequelize = require("../util/database");

// const User = sequelize.define("user", {
//   id: {
//     type: Sequelize.INTEGER,
//     allowNull: false,
//     autoIncrement: true,
//     primaryKey: true,
//   },

//   name: {
//     type: Sequelize.STRING,
//     allowNull: false,
//   },

//   mobileNo: {
//     type: Sequelize.STRING,
//     allowNull: false,
//   },

//   email: {
//     type: Sequelize.STRING,
//     allowNull: false,
//     unique: true,
//   },

//   password: {
//     type: Sequelize.STRING,
//     allowNull: false,
//   },

//   isPremium: {
//     type: Sequelize.BOOLEAN,
//     defaultValue: false,
//   },

//   totalExpenses: {
//     type: Sequelize.INTEGER,
//     defaultValue: 0,
//   },
// });

// module.exports = User;
