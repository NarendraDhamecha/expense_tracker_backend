const express = require("express");
const app = express();
const fs = require("fs");
const path = require("path");
const bodyparser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
require("dotenv").config();
// const sequelize = require("./util/database");
const userAuthRoutes = require("./routers/userAuthRoutes");
const expensesRoutes = require("./routers/expensesRoutes");
const premiumFeatureRoutes = require("./routers/premiumFeatureRoutes");
const purchasePremiumRoutes = require("./routers/purchasePremiumRoutes");
const resetPasswordRoutes = require("./routers/resetPasswordRoutes");
const authMiddleware = require("./middleware/authMiddleware");
// const User = require("./models/userAuthModel");
// const Expenses = require("./models/expensesModel");
// const Order = require("./models/premiumFeaturesModel");
// const Forgotpassword = require("./models/forgotPasswordModel");
// const DownloadedExpenses = require("./models/downloadedExpenses");
const mongoose = require('mongoose');

const accessLogStream = fs.createWriteStream(
  path.join(__dirname, "access.log"),
  { flags: "a" }
);

app.use(cors());

app.use(helmet());

app.use(morgan("combined", { stream: accessLogStream }));

app.use(bodyparser.json());

app.use("/user", userAuthRoutes);

app.use("/expenses", authMiddleware, expensesRoutes);

app.use("/purchase", authMiddleware, purchasePremiumRoutes);

app.use("/premium", authMiddleware, premiumFeatureRoutes);

app.use("/password", resetPasswordRoutes);

// User.hasMany(Order);
// Order.belongsTo(User);

// User.hasMany(Expenses);
// Expenses.belongsTo(User);

// User.hasMany(Forgotpassword);
// Forgotpassword.belongsTo(User);

// User.hasMany(DownloadedExpenses);
// DownloadedExpenses.belongsTo(User);


mongoose.connect(process.env.MONGODB_URL).then((connection) => {
  console.log("Connected!")
  app.listen(process.env.PORT || 4000)
}).catch(error => {
  console.log("Error while connecting mongodb", error)
})
// sequelize
//   .sync()
//   .then(() => app.listen(process.env.PORT || 4000))
//   .catch((error) => console.log(error));
