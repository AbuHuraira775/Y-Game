const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  name: { type: String, require: true },
  email: { type: String, require: true },
  password: { type: String, require: true },
  phone: { type: String, require: true },
  address: { type: String, required: true },
  type: { type: String, required: true, default: "admin" },
  isVerified: { type: Boolean, default: false },
  otp: { type: String, required: true },
  token: { type: String, required: true },
});

const Admin = new mongoose.model('Admin',adminSchema)

module.exports = Admin