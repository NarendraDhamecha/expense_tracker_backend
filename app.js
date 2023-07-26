const express = require("express");
const app = express();
const bodyparser = require("body-parser");
const cors = require("cors");
const sequelize = require("./util/database");
const userAuthRoutes = require("./routers/userAuthRoutes");
const expensesRoutes = require('./routers/expensesRoutes');
const premiumFeatureRoutes = require('./routers/premiumFeatureRoutes');
const purchasePremiumRoutes = require('./routers/purchasePremiumRoutes');
const resetPasswordRoutes = require('./routers/resetPasswordRoutes');
const authMiddleware = require('./middleware/authMiddleware');
const User = require('./models/userAuthModel');
const Expenses = require('./models/expensesModel');
const Order = require('./models/premiumFeaturesModel')
require('dotenv').config()

app.use(cors());

app.use(bodyparser.json());

app.use("/user", userAuthRoutes);

app.use('/expenses', authMiddleware, expensesRoutes);

app.use('/purchase', authMiddleware, purchasePremiumRoutes);

app.use('/premium', authMiddleware, premiumFeatureRoutes);

app.use('/password', resetPasswordRoutes);

User.hasMany(Order);
Order.belongsTo(User);

User.hasMany(Expenses);
Expenses.belongsTo(User);

sequelize
  .sync()
  .then(() => app.listen(4000))
  .catch((err) => console.log(err));
