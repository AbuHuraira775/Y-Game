const Contact = require("../models/contact-model");
const Post = require("../models/post-model");
const sendContact = require("../utils/send-contact");

const home = async (req, res) => {
  try {
    const allPosts = await Post.find();
    if (!allPosts) {
      return res.status(400).json({ message: "No posts available" });
    } else {
      return res.status(200).json({
        state: true,
        msg: `All posts are rendered`,
        data: allPosts,
      });
    }
  } catch (err) {
    console.log(err);
  }
};

const contact = async(req, res) => {
  try {
    const { name, email, message } = req.body;
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!name || !email || !message) {
      return res.status(400).json({ state:false, msg: "Please fill the contact form" });
    } else {
      if (!emailRegex.test(email)) {
        return res.status(401).json({ status:false,msg: "Invalid Email" });
      } else {
        await Contact.create({name, email, message});
        sendContact(name,email, message);
        return res
          .status(200)
          .json({
            state: true,
            message: "Your response has been sent successfully",
            date: req.body,
          });
      }
    }
  } catch (err) {
    console.log(err);
  }
};

const login = (req, res) => {
  try {
    res.json({ message: "Login Server is started here..." });
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  home,
  contact,
  login,
};
