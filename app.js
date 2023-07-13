const express = require("express");
const app = express();
const bodyparser = require("body-parser");
const cors = require("cors");
const sequelize = require("./util/database");
const userRoutes = require('./routers/userSignUpRoutes');

app.use(cors());

app.use(bodyparser.json());

app.use('/expense', userRoutes)

sequelize
  .sync()
  .then(() => app.listen(4000))
  .catch((err) => console.log(err));
