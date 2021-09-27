const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let postSchema = new Schema({
	author: {type: Schema.Types.ObjectId, ref: 'User'},
	createdAt: Date,
	postTitle: String,
	postText: String,
	postImage: [String],
	likes: Number,
	likedBy: [{type: Schema.Types.ObjectId, ref: 'User'}],
	comments: [{type: Schema.Types.ObjectId, ref: 'Comment'}]
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;