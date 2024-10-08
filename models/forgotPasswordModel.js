const mongoose = require("mongoose");

const forgotPasswordSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },

  active: {
    type: Boolean,
  },

  userId: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model("Forgotpassword", forgotPasswordSchema);

// const Sequelize = require("sequelize");
// const sequelize = require("../util/database");

// const Forgotpassword = sequelize.define("forgotpassword", {
//   id: {
//     type: Sequelize.UUID,
//     allowNull: false,
//     primaryKey: true,
//   },

//   active: Sequelize.BOOLEAN,
// });

// module.exports = Forgotpassword;
