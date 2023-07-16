const express = require("express");
const app = express();
const bodyparser = require("body-parser");
const cors = require("cors");
const sequelize = require("./util/database");
const userAuthRoutes = require("./routers/userAuthRoutes");
const expensesRoutes = require('./routers/expensesRoutes');
const authMiddleware = require('./middleware/authMiddleware');
const User = require('./models/userAuthModel');
const Expenses = require('./models/expensesModel');

app.use(cors());

app.use(bodyparser.json());

app.use("/user", userAuthRoutes);

app.use('/expenses', authMiddleware, expensesRoutes)

User.hasMany(Expenses);
Expenses.belongsTo(User);

sequelize
  .sync()
  .then(() => app.listen(4000))
  .catch((err) => console.log(err));
