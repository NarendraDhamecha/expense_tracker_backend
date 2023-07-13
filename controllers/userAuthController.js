const User = require("../models/userAuthModel");

exports.userSignUp = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const name = req.body.name;
  const mobileNo = req.body.mobileNo;

  try {
    const response = await User.create({
      name,
      mobileNo,
      email,
      password,
    });

    res.json(response);
  } catch (err) {
    res.status(401).send(err);
  }
};

exports.userLogIn = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  try {
    const response = await User.findOne({ where: { email: email } });

    if (response !== null) {
      response.dataValues.password === password
        ? res.json({ message: "User login sucessful" })
        : res.status(401).send({ message: "User not authorized" });
    }
    else{
      res.status(404).send({ message: "User not found" })
    }
  } catch (err) {
    console.log(err);
  }
};
