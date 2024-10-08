const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  paymentId: {
    type: String,
  },

  orderId: {
    type: String,
  },

  status: {
    type: String,
  },

  userId: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model("Order", orderSchema);

// const Sequelize = require("sequelize");
// const sequelize = require("../util/database");

// const Order = sequelize.define("order", {
//   id: {
//     type: Sequelize.INTEGER,
//     allowNull: false,
//     autoIncrement: true,
//     primaryKey: true,
//   },

//   paymentId: {
//     type: Sequelize.STRING,
//   },
//   orderId: {
//     type: Sequelize.STRING,
//   },

//   status: {
//     type: Sequelize.STRING,
//   },
// });

// module.exports = Order;
