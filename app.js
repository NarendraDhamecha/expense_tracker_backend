const express = require("express");
const app = express();
const bodyparser = require("body-parser");
const cors = require("cors");
const sequelize = require("./util/database");
const userAuthRoutes = require("./routers/userAuthRoutes");
const expensesRoutes = require('./routers/expensesRoutes');

app.use(cors());

app.use(bodyparser.json());

app.use("/user", userAuthRoutes);

app.use('/expenses', expensesRoutes)

sequelize
  .sync()
  .then(() => app.listen(4000))
  .catch((err) => console.log(err));
