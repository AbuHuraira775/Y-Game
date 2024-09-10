const nodemailer = require("nodemailer");
require("dotenv").config();

const sendVerification = async (userEmail, message) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.AUTH_EMAIL,
      pass: process.env.AUTH_PASSWORD,
    },
  });

  const mailOption = {
    from: process.env.AUTH_EMAIL,
    to: userEmail,
    subject: `Game Score Posting - Account Verification`,
    text: "Hello world!",
    html: `<h3>Your account is <span style="color:green">${message}</span></h3>
            <h3>Now you are able to add, update and delete your game scores</h3>
            <p>Thank you for joining us</p>`,
  };

  try {
    await transporter.sendMail(mailOption);
  } catch (error) {
    console.log("Email sending failed with an error " + error);
  }
};

module.exports = sendVerification;
