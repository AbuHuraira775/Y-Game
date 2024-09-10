const Admin = require("../models/admin-model");

const register = async (req, res) => {
  try {
    const { name, email, password, phone, address,type,otp,token } = req.body;
    await Admin.create({
      name, email, password, phone, address, type, otp, token
    });
    res.json({ message: "register Server is started here..." });
  } catch (err) {
    console.log("API Error due to : ", err);
  }
};

const login = (req, res) => {
  try {
    res.json({ message: "Login Server is started here..." });
  } catch (err) {
    console.log("API Error due to : ", err);
  }
};

const verifyAccount = (req, res) => {
  try {
    res.json({ message: "verifyAccount API is started here..." });
  } catch (err) {
    console.log("API Error due to : ", err);
  }
};

const addPost = (req, res) => {
  try {
    res.json({ message: "Add Post Server is started here..." });
  } catch (err) {
    console.log("API Error due to : ", err);
  }
};

const updatePost = (req, res) => {
  try {
    res.json({ message: "Update Post API is started here..." });
  } catch (err) {
    console.log("API Error due to : ", err);
  }
};

const deletePost = (req, res) => {
  try {
    res.json({ message: "Delete Post API is started here..." });
  } catch (err) {
    console.log("API Error due to : ", err);
  }
};

module.exports = {
  register,
  login,
  verifyAccount,
  addPost,
  updatePost,
  deletePost,
};