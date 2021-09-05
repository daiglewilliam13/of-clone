const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let postSchema = new Schema({
	author_id:Number,
	createdAt: Number,
	postTitle: String,
	postText: String,
	postImage: String
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;