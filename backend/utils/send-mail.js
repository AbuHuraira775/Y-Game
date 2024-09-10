const nodemailer = require('nodemailer')
require('dotenv').config();

const sendOTP = async (userEmail, message) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.AUTH_EMAIL,
            pass: process.env.AUTH_PASSWORD
        }
    })

    const mailOption = {
        from: process.env.AUTH_EMAIL,
        to: userEmail,
        subject: "Verification Code",
        text: 'Hello world!',
        html: `<h3>This is the verification code from the Game Score Posting</h3>
                <h1 style="color: blue">${message}</h1>
                <h3>Use this code to verify your account and then you will be able to post, update and delete your game scores</h3>`
    }

    try {
        await transporter.sendMail(mailOption)
    }
    catch (error) {
        console.log("Email sending failed with an error " + error)

    }
}


module.exports = sendOTP