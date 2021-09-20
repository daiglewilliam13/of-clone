const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let commentSchema = new Schema({
	author: {type: Schema.Types.ObjectId, ref: 'User'},
	createdAt: Number,
	commentText: String,
	likes: Number,
	likedBy: {type: Schema.Types.ObjectId, ref: 'User'},
});

const Post = mongoose.model("Comment", commentSchema);

module.exports = Comment;