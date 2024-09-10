const Post = require("../models/post-model");

const home = async (req, res) => {
  try {
    const allPosts = await Post.find();
    if (!allPosts) {
      return res.json({ message: "No posts available" });
    } else {
      return res.json({
        state: true,
        msg: `All posts are rendered`,
        data: allPosts,
      });
    }
  } catch (err) {
    console.log(err);
  }
};

const contact = (req, res) => {
  try {
    const { name, email, message } = req.body;
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!name && !email && !message) {
      return res.status(422).json({ error: "Please fill the contact form" });
    } else {
      if (!emailRegex.test(email)) {
        return res.status(422).json({ error: "Invalid Email" });
      } else {
        return res
          .status(200)
          .json({
            state: true,
            message: "Your contact has been sent successfully",
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
