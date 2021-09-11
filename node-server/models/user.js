const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let userSchema = new Schema({
	username: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	}, 
	posts: [{type: Schema.Types.ObjectId, ref: 'Post'}],
	following: [{type: Schema.Types.ObjectId, ref: 'User'}],
	followers: [{type: Schema.Types.ObjectId, ref: 'User'}],
	profilePicture: {
		type: String,
	},
	createdAt: Number,
	lastVisited: Number, 
	

}, {timestamps: true});

const User = mongoose.model("User", userSchema);

module.exports = User;