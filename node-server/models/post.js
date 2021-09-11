const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let postSchema = new Schema({
	author: {type: Schema.Types.ObjectId, ref: 'User'},
	createdAt: Number,
	postTitle: String,
	postText: String,
	postImage: [String],
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;