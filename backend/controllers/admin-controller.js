const Admin = require("../models/admin-model");
const comaprePassword = require("../utils/compae-password");
const createToken = require("../utils/create-token");
const generate_OTP = require("../utils/generate-otp");
const hashPassword = require("../utils/hash-password");
const Post = require("../models/post-model");
const sendContact = require("../utils/send-contact");
const sendVerification = require("../utils/send-verification");
const sendOTP = require("../utils/send-mail");

// // status codes
// 401: 'User is not an admin',
// 403: 'Admin not verified',
// 200: 'Success',
// 404: 'Post not found',
// 404: 'Score not found',
// 404: 'Email not found',
// 404: 'Admin not found',
// 400: 'Score not provided',
// 400: 'Email not correct',
// 400: 'Password not correct',
// 400: 'OTP not correct',
// 400: 'Admin not created',
// 409: 'Post not deleted',
// 409: 'Post not updated',
// 409: 'Score not updated',
// 409: 'Score not added',
// 409: 'Score not deleted'

// GET /api/admin/otp-send
const sendOtp = async (req, res) => {
  try {
    const { email } = req.body;
    const existEmail = await Admin.findOne({ email });
    if (!existEmail) {
      return res.status(401).json({
        state: false,
        msg: `Your account is not registered with this email. Email is not correct`,
      });
    } else {
      const otp = generate_OTP();
      existEmail.otp = otp;
      sendOTP(email, otp);
      await existEmail.save();
      return res.status(200).json({
        state: true,
        msg: `Otp is sent to your email`,
        data: existEmail,
      });
    }
  } catch (err) {
    console.log("API Error due to : ", err);
  }
};

const fetchAdmin = async (req, res) => {
  try {
    const existEmail = await Admin.findOne();
    if (!existEmail) {
      return res
        .status(400)
        .json({ state: false, message: "Admin does not exist" });
    } else {
      return res
        .status(200)
        .json({ state: true, message: "Admin exist", data: existEmail });
    }
  } catch (err) {
    console.log("API Error due to : ", err);
  }
};
// POST /api/admin/register
const register = async (req, res) => {
  try {
    const { name, email, password, phone, address, type } = req.body;
    const existEmail = await Admin.findOne();

    if (existEmail) {
      return res.status(401).json({
        state: false,
        message:
          "You are not able to create the admin account. Admin already exits",
      });
    } else {
      const hased_password = await hashPassword(password);

      sendOTP(email, otp);
      await Admin.create({
        name,
        email,
        password: hased_password,
        phone,
        address,
        type,
      });
      return res.status(200).json({
        state: true,
        message: `You are registered successfully. Please verify your account.`,
        data: { name, email, phone, address, type },
      });
    }
  } catch (err) {
    console.log("API Error due to : ", err);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const existEmail = await Admin.findOne({ email });
    if (!existEmail) {
      return res.status(401).json({
        state: false,
        msg: `Your are not registered with this email. Email is not correct`,
      });
    } else {
      const hashed_password = await existEmail.password;
      const result = await comaprePassword(password, hashed_password); // return true of false
      if (result) {
        // create the token
        const type = await existEmail.type;
        const id = await existEmail._id;
        const token = await createToken(email, id, type);
        existEmail.token = token;
        await existEmail.save();

        return res.status(200).json({
          state: true,
          msg: `Login Successfully`,
          data: existEmail,
          token: token,
        });
      } else {
        return res.status(400).json({
          state: false,
          msg: `Password is not correct`,
        });
      }
    }
  } catch (err) {
    console.log("API Error due to : ", err);
  }
};

const getAdmin = async (req, res, next) => {
  try {
    const admin = req.admin
    return res.json({admin})
  } 
  catch (err) {
    console.log("API Error due to : ", err);
  }
};

const verifyAccount = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const existEmail = await Admin.findOne({ email });

    if (existEmail) {
      if (email == existEmail.email) {
        if (otp == existEmail.otp) {
          if (existEmail.isVerified) {
            return res.status(401).json({
              state: false,
              msg: `You are verified already and your otp has been expired`,
            });
          } else {
            existEmail.isVerified = true;
            await existEmail.save();
            sendVerification(existEmail.email, `verified`);
            return res
              .status(200)
              .json({ state: true, msg: `You are verified successfully` });
          }
        } else {
          return res
            .status(402)
            .json({ state: false, msg: `OTP is not correct` });
        }
      } else {
        return res
          .status(403)
          .json({ state: false, msg: `Email is not correct` });
      }
    } else {
      return res
        .status(400)
        .json({ state: false, msg: `Admin does not exist` });
    }
  } catch (err) {
    console.log("API Error due to : ", err);
  }
};

const addPost = async (req, res) => {
  try {
    const { email, number, date } = req.body;
    const existEmail = await Admin.findOne({ email });
    const score = Number(number);

    const admin = await Admin.findOne({ email });
    console.log(admin);
    const name = await admin.name;

    if (!existEmail) {
      return res.status(401).json({
        state: false,
        msg: `You are not authorized to add the score`,
      });
    }   
      if (score >= 1) {
          await Post.create({ email, score, date, name });
          return res.status(200).json({
            state: true,
            msg: `Your have scuucessfully added this post`,
          });
        } else {
          return res.status(403).json({
            state: false,
            msg: `Score is required. and it should be greater than 0`,
          });
        }
  } catch (err) {
    console.log("API Error due to : ", err);
  }
};

const updatePost = async (req, res) => {
  try {
    const { email, number, date } = req.body;
    const score = Number(number);
    const id = req.params.id;

    const existEmail = await Admin.findOne({ email });
    if (!existEmail) {
      return res.status(400).json({
        state: false,
        msg: `You are not authorized to edit the score `,
      });
    }
    const post = await Post.findOne({ _id: id });
        if (!post) {
          return res
            .status(402)
            .json({ state: false, msg: `Post does not exist` });
        } else {
          if (score < 1) {
            return res.status(403).json({
              state: false,
              msg: `Score is required. and it should be greater than 0`,
            });
          } else {
            post.score = score;
            post.date = date;
            await post.save();
            return res.status(200).json({
              state: true,
              msg: `Score is updated successfully`,
              data: post,
            });
          }
    }
  } catch (err) {
    console.log("API Error due to : ", err);
  }
};

const deletePost = async (req, res) => {
  try {
    const { email } = req.body;
    const id = req.params.id;
    const existEmail = await Admin.findOne({ email });
    console.log(existEmail);
    const post = await Post.findById({ _id: id });

    if (!existEmail) {
      return res.status(400).json({
        state: false,
        msg: `You are not authorized to delete the score`,
      });
    } 
      
        if (!post) {
          return res.status(402).json({
            state: false,
            msg: `Post does not exist`,
          });
        } else {
          await Post.deleteOne({ _id: id });
          console.log(post);
          return res.status(200).json({
            state: true,
            msg: `Score is deleted successfully`,
          });
        }
  } catch (err) {
    console.log("API Error due to : ", err);
  }
};

module.exports = {
  sendOtp,
  fetchAdmin,
  register,
  login,
  verifyAccount,
  addPost,
  updatePost,
  deletePost,
  getAdmin,
};
