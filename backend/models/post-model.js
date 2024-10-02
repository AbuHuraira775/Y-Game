const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  email: { type: String, require: true },
  score: { type: Number, require: true },
  date: { type: String, require: true },
},
{timestamps:true}
);

const Post = new mongoose.model("Post", postSchema);

module.exports = Post;
