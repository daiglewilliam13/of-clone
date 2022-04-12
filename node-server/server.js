const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const app = express();
const bcrypt = require('bcrypt');
const User = require('./models/user');
const Post = require('./models/post');
const Message = require('./models/message');
const Comment = require('./models/comment');
const jwtSecret = 'pizza';
const passportSecret = 'pizza';

app.use(function (req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Credentials', 'true');
	res.header('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT');
	res.header(
		'Access-Control-Allow-Headers',
		'Access-Control-Allow-Headers, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, x-access-token'
	);
	res.header('Access-Control-Allow-Origin', 'https://ofclone-nmoaj.run-us-west2.goorm.io'); // update to match the domain you will make the request from
	next();
});

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
const uri =
	'mongodb+srv://sampleadmin:sampleadmin@social-media-clone.dfnw4.mongodb.net/trulyfans?retryWrites=true&w=majority';
mongoose.connect(uri, { useNewUrlParser: true });
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse application/json
app.use(bodyParser.json());
//middleware
function verifyJWT(req, res, next) {
	const token = req.headers['x-access-token'].split(' ')[1];

	if (token) {
		jwt.verify(token, passportSecret, (err, decoded) => {
			if (err)
				return res.json({
					isLoggedIn: false,
					message: 'Failed to authenticate',
					message: err,
				});
			req.user = {};
			req.user.id = decoded.id;
			req.user.username = decoded.username;
			console.log(req.user.username + ' verified');
			next();
		});
	} else {
		res.json({ message: 'Incorrect Token Given', isLoggedIn: false });
	}
}

app.get('/getUsername', verifyJWT, (req, res) => {
	res.json({ isLoggedIn: true, username: req.user.username, id: req.user.id });
});

app.post('/getUserInfo', (req, res) => {
	User.findById(req.body.id).exec((err, foundUser) => {
		if (err) {
			console.log(err);
			res.json(err);
		} else {
			res.json(foundUser);
		}
	});
});

app.post('/getUsername', (req, res) => {
	if (!req.body.id) {
		res.json('');
	} else {
		User.findById(req.body.id).exec((err, foundUser) => {
			if (err) console.log(err);
			res.json(foundUser.username);
		});
	}
});

app.post('/register', async (req, res) => {
	const user = req.body;
	console.log(req.body);
	const takenUsername = await User.findOne({ username: user.username });
	const takenEmail = await User.findOne({ email: user.email });

	if (takenUsername || takenEmail) {
		res.json({ message: 'Username or email already taken', redirect: true });
	} else {
		user.password = await bcrypt.hash(req.body.password, 10);

		const dbUser = new User({
			_id: new mongoose.Types.ObjectId(),
			username: user.username.toLowerCase(),
			email: user.email.toLowerCase(),
			password: user.password,
		});

		dbUser.save();
		res.json({
			message: 'Success',
			isLoggedIn: true,
		});
	}
});

app.post('/login', (req, res) => {
	const userCredentials = req.body;
	User.findOne({ username: userCredentials.username }).then((dbUser) => {
		if (!dbUser) {
			return res.json({
				message: 'Invalid Username or Password',
			});
		}
		bcrypt.compare(userCredentials.password, dbUser.password).then((isCorrect) => {
			if (isCorrect) {
				const payload = {
					id: dbUser._id,
					username: dbUser.username,
				};
				jwt.sign(payload, jwtSecret, { expiresIn: 86400 }, (err, token) => {
					if (err) return res.json({ message: err });
					return res.json({
						id: payload.id,
						username: payload.username,
						message: 'Success',
						token: 'Bearer ' + token,
					});
				});
			} else {
				return res.json({
					message: 'Invalid Username or Password',
				});
			}
		});
	});
});

app.post('/getLikes', async (req, res) => {
	const postId = req.body.id;
	const likedBy = req.body.likedBy;
	Post.exists({ _id: postId, likedBy: likedBy }, function (err, result) {
		if (result) {
			Post.findByIdAndUpdate(postId, {
				$inc: { likes: -1 },
				$pull: { likedBy },
			}).then(() => {
				User.findByIdAndUpdate(likedBy, {
					$pull: { likedPosts: postId },
				}).then(() => {
					res.json({ message: 'unliked', isLiked: false });
				});
			});
		} else {
			Post.findByIdAndUpdate(postId, {
				$inc: { likes: 1 },
				$addToSet: { likedBy },
			}).then(() => {
				User.findByIdAndUpdate(likedBy, {
					$addToSet: { likedPosts: postId },
				}).then(() => {
					res.json({ message: 'liked', isLiked: true });
				});
			});
		}
	});
});

// simple route
app.get('/', (req, res) => {
	res.json({ message: 'Welcome to TRULYFANS API' });
});
//get data route
app.post('/getConversations', (req, res) => {
	const userInfo = req.body;
	Message.find({ members: userInfo.id }, function (err, foundMessages) {
		if (err) console.log(err);
		res.json(foundMessages);
	});
});
app.post('/sendMessage', verifyJWT, (req, res) => {
	const messageData = req.body;
	//check if thread exists
	let members = [];
	const newMessage = new Message({
		members: [],
		messages: {
			text: messageData.messageText,
			sentAt: messageData.createdAt,
			sentBy: messageData.author,
		},
	});
	User.findOne({ username: messageData.recipient }, function (err, foundUser) {
		if (!foundUser) {
			res.json('user does not exist');
		} else {
			members = [foundUser._id, messageData.author];
			Message.findOne(
				{
					members: { $size: 2, $all: members },
				},
				function (err, foundMessage) {
					if (foundMessage) {
						Message.findByIdAndUpdate(foundMessage._id, {
							$addToSet: { messages: newMessage.messages },
						}).then(() => {
							console.log('message pushed');
						});
					} else {
						newMessage.members.push(foundUser._id, messageData.author);
						newMessage.save();
						console.log('thread not found, created new one');
					}
				}
			);
			res.json('success');
		}
	});
});

app.post('/getCommentData', verifyJWT, (req, res) =>{
	//find parent post
	Comment.findOne({_id:req.body}, function(err, foundComment){
		if(err) console.log(err)
		res.json(foundComment)
	})
	//send back comment data
})

app.post('/addComment', verifyJWT, async (req, res) => {
	console.log(req.body);
	//push comment object to db
	const commentData = req.body;
	const newComment = new Comment({
		_id: new mongoose.Types.ObjectId(),
		parent: commentData.parent,
		author: {
			id: commentData.author.id,  
			username: commentData.author.username 
			},
		createdAt: commentData.createdAt,
		commentText: commentData.commentText,
		likes: commentData.likes,
		likedBy: [commentData.likedBy],
	});
	console.log(newComment)
	newComment.save();
	//find parent post in comment data
	Post.findByIdAndUpdate(commentData.parent, {
		//push comment id ref to post comment array
		$addToSet: { comments: newComment._id },
	}).then(() => {
		console.log('comment pushed');
		res.json('comment added');
	});
});

app.post('/posts', verifyJWT, async (req, res) => {
	const postData = req.body;
	const newPost = new Post({
		_id: new mongoose.Types.ObjectId(),
		postTitle: postData.postTitle,
		postText: postData.postText,
		author: postData.author,
		createdAt: postData.createdAt,
		likedBy: [postData.author],
		likes: 1,
	});
	newPost.save();
	res.json('post created');
});

app.get('/posts', (req, res) => {
	Post.find()
		.sort({ createdAt: -1 })
		.exec((err, document) => {
			if (err) {
				console.log(err);
				res.json(err);
			} else {
				res.json(document);
			}
		});
});
// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}.`);
});