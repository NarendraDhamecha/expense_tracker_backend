const jwt = require("jsonwebtoken");
const User = require("../models/userAuthModel");

const Authorization = async (req, res, next) => {
  const token = req.header("Authorization");
  const userId = jwt.verify(token, process.env.JWT_SECRET_KEY);

  try {
    const user = await User.findByPk(userId.userId);
    req.user = user;
    next();
  } catch (err) {
    res.status(401).json(err);
  }
};

module.exports = Authorization;
