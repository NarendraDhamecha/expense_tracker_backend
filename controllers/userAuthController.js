const User = require("../models/userAuthModel");
const bcrypt = require("bcrypt");

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

exports.userLogIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    const response = await User.findOne({ where: { email: email } });

    if (response !== null) {
      bcrypt.compare(password, response.dataValues.password, (err, result) => {
        if (result) {
          res.json({ message: "User login sucessful" });
        } else {
          res.status(401).send({ message: "User not authorized" });
        }
      });
    } else {
      res.status(404).send({ message: "User not found" });
    }
  } catch (err) {
    console.log(err);
  }
};
