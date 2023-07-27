const nodemailer = require("nodemailer");
const uuid = require("uuid");
const bcrypt = require("bcrypt");
const User = require("../models/userAuthModel");
const Forgotpassword = require("../models/forgotPasswordModel");

exports.forgotPassword = async (req, res) => {
  try {
    const email = req.body.email;
    const user = await User.findOne({ where: { email: email } });

    if (user) {
      const id = uuid.v4();
      await user.createForgotpassword({ id: id, active: true });

      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL,
          pass: process.env.PASSWORD,
        },
      });

      const mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: "reset password link",
        html: `<a href='http://localhost:4000/password/resetpassword/${id}'>Reset password</a>`,
      };

      transporter.sendMail(mailOptions, (error, data) => {
        if (error) {
          throw new Error(error);
        }

        res.json(data);
      });
    } else {
      throw new Error("User not exist");
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const id = req.params.id;

    const forgotPassword = await Forgotpassword.findOne({ where: { id: id } });

    if (forgotPassword && forgotPassword.active) {
      res.send(`<html>
        <script>
            function formsubmitted(e){
                e.preventDefault();
                console.log('called')
            }
        </script>
         
     <body>
        <form action="/password/updatepassword/${id}" method="get">
          <label for="newpassword">Enter New password</label>
          <input name="newpassword" type="password" required></input>
          <button>reset password</button>
        </form>
     </body> 
    </html>`);
      res.end();
    } else {
      res.status(403).json({ message: "link expired" });
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.updatePassword = async (req, res) => {
  try {
    const id = req.params.id;
    const newpassword = req.query.newpassword;

    const forgotpassword = await Forgotpassword.findOne({ where: { id: id } });

    const user = await User.findOne({ where: { id: forgotpassword.userId } });

    if (user) {
      bcrypt.hash(newpassword, 10, async (err, hash) => {
        try {
          if (err) {
            console.log(err);
            throw new Error(err);
          }

          await user.update({ password: hash });
          await forgotpassword.update({ active: false });
          res.json({ message: "successfully updated new password" });
        } catch (err) {
          console.log(err);
          res.status(500).json(err);
        }
      });
    } else {
      res.status(404).json({ error: "user not exist" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};
