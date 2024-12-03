const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    message: {
        type: String,
        required: true
    },
    author_id:{
        type: String,
        required: true,
    }
})

const Comment = mongoose.model('comments', commentSchema);
module.exports = Comment;