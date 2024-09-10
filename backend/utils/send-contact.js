const nodemailer = require("nodemailer");
require("dotenv").config();

const sendContact = async (userName, userEmail, message) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.AUTH_EMAIL,
      pass: process.env.AUTH_PASSWORD,
    },
  });

  const mailOption = {
    from: userEmail,
    to: process.env.AUTH_EMAIL,
    subject: userName,
    text: "Hello world!",
    html: `<p>Name: ${userName}</p>
            <p>Email: <a href='mailto:${userEmail}'>${userEmail}</a></p>
            <h3>${message}</h3>`,
  };

  try {
    await transporter.sendMail(mailOption);
  } catch (error) {
    console.log("Email sending failed with an error " + error);
  }
};

module.exports = sendContact;
