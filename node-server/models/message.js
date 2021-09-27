const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let messageSchema = new Schema({
	members: [{type: Schema.Types.ObjectId, ref: 'User'}],
	messages: [{
		text: String,
		sentAt: Date,
		sentBy: {type: Schema.Types.ObjectId, ref: 'User'}
	}],
});

const Message = mongoose.model("Message", messageSchema);

module.exports = Message;