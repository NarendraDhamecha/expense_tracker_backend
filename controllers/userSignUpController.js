const User = require("../models/userSignUpModel");

exports.postUserCreds = async (req, res) => {
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
