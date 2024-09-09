const { ReturnDocument } = require("mongodb");
const Admin = require("../models/admin-model");
const comaprePassword = require("../utils/compae-password");
const createToken = require("../utils/create-token");
const generate_OTP = require("../utils/generate-otp");
const hashPassword = require("../utils/hash-password");
const Post = require("../models/post-model");

const register = async (req, res) => {
  try {
    const { name, email, password, phone, address, type, otp, token } = req.body;
    const existEmail = await Admin.findOne({ email });

    if (existEmail) {
      return res.json({ message: "Email already exists" });
    } 
    else {
      const otp = generate_OTP();
      const token = await createToken(email, type);
      const hased_password = await hashPassword(password);

      await Admin.create({
        name,
        email,
        password: hased_password,
        phone,
        address,
        type,
        otp,
        token,
      });
      return res.json({
        message: `You are register successfully. Please verify your account.`,
      });
    }
  } 
  catch (err) {
    console.log("API Error due to : ", err);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const existEmail = await Admin.findOne({ email });
    if (!existEmail) {
      return res.status(400).json({
        state: false,
        msg: `Admin does not exist`
    })  
    } 
    else {
      const hashed_password = await existEmail.password;
      const result = await comaprePassword(password, hashed_password); // return true of false
      console.log(existEmail)
      if (result) {
        // create the token
        const type = await existEmail.type;
        const token = await createToken(email, type);
        await existEmail.save()

        return res.status(200).json({
          state: true,
          msg: `Login Successfully`,
          data: existEmail,
      })
      } 
      else {
        return res.status(400).json({
          state: false,
          msg: `Password is not correct`,
        });
      }
    }
  } 
  catch (err) {
    console.log("API Error due to : ", err);
  }
};

const verifyAccount = async(req, res) => {
  try {
  
    const { email, otp } = req.body;
    const existEmail = await Admin.findOne({ email })

    if (existEmail) {
        if (otp == existEmail.otp) {
          if(existEmail.isVerified){
            return res.status(400).json({state:false, msg:`You are verified already and your otp has been expired`})
          }
          else{

            existEmail.isVerified = true
            
            // update MongoDB 
            await existEmail.save();
            return res.status(200).json({ state: true, msg: `You are verified successfully` })
          }
        }
        else {
            return res.status(400).json({ state: false, msg: `OTP is not correct` })
        }
    }
    else {
        return res.status(400).json({ state: false, msg: `Admin does not exist` })
    }


  } 
  catch (err) {
    console.log("API Error due to : ", err);
  }
};

const addPost = async(req, res) => {
  try {
    const {email, title, description, score} = req.body;
    const existEmail = await Admin.findOne({email})
    if(!existEmail){
      return res.status(400).json({state:false, msg: `You are not authorized to add the score`})
    }
    else{
      if(!existEmail.isVerified){
        return res.status(400).json({state: false, msg: `You account is not verified. You are enable to add your score`})
      }
      await Post.create({email, title, description, score})
      return res.status(200).json({state:true, msg: `Your have scuucessfully added this post`})
    }
  } 
  catch (err) {
    console.log("API Error due to : ", err);
  }
};

const updatePost = async (req, res) => {
  try {
    const {email, title, description, score} = req.body;
    const id = req.params.id;

    const existEmail = await Admin.findOne({email})
    if(!existEmail){
      return res.status(400).json({state:false, msg: `You are not authorized to edit the score `})
    }
    else{
      if(!existEmail.isVerified){
        return res.status(400).json({state: false, msg: `Your account is not verified. You are enable to add your score`})
      }
      else{

        const post = await Post.findOne({_id: id})
        if(!post){
          return res.status(400).json({state: false, msg: `Post does not exist`})
        }
        else{
          post.description = description
          post.title = title
          post.score = score
          await Post.updateOne({description,title,score})
          return res.status(200).json({state:true,msg:`Score is updated successfully`,data: post})
        }
      }
    }
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
