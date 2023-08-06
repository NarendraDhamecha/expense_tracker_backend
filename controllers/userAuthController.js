const User = require("../models/userAuthModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.userSignUp = (req, res) => {
  const { email, password, name, mobileNo } = req.body;

  bcrypt.hash(password, 10, async (err, hash) => {
    try {
      await User.create({
        name,
        mobileNo,
        email,
        password: hash,
      });

      res.json({ message: "user created successfully" });
    } catch (err) {
      res.status(401).json(err);
    }
  });
};

const generateToken = (id) => {
  return jwt.sign({ userId: id }, process.env.JWT_SECRET_KEY);
};

exports.userLogIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email: email } });

    if (user !== null) {
      bcrypt.compare(password, user.dataValues.password, (err, result) => {
        if (err) {
          throw new Error(err);
        }

        if (result) {
          res.json({
            message: "User login sucessful",
            token: generateToken(user.dataValues.id),
            isPremium: user.dataValues.isPremium,
          });
        } else {
          return res.status(401).json({ message: "User not authorized" });
        }
      });
    } else {
      return res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    res.status(500).json({ message: "unknown error" });
  }
};
