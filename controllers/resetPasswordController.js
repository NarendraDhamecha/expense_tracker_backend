const nodemailer = require('nodemailer');

exports.forgotPassword = async (req, res) => {
  const email = req.body.email;
  try{
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
        } 
    })

    const mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: 'sending email with node',
        html: '<h1>Congratulation you have sent your first email</h1>'
    }
    
    transporter.sendMail(mailOptions, (error, data) => {
        if(error){
            console.log(error);
        }
        else{
            res.json(data);
        }
    })
  }
  catch(err){
     res.status(401).json(err)
  }
}