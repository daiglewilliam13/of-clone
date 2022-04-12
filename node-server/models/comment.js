const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let commentSchema = new Schema({
	parent: {type: Schema.Types.ObjectId, ref:'Post'},
	author: {
		id:{type: Schema.Types.ObjectId, ref: 'User'},
		username: String 
	},
	createdAt: Date,
	commentText: String,
	likes: Number,
	likedBy: [{type: Schema.Types.ObjectId, ref: 'User'}],
});

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;