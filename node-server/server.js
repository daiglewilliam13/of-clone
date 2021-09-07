const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const app = express();
const bcrypt = require('bcrypt');
const User = require('./models/user') 
const Post = require('./models/post');
const jwtSecret = "pizza";
const passportSecret = "pizza";

app.use(function (req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Credentials', 'true');
	res.header('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT');
	res.header(
		'Access-Control-Allow-Headers',
		'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, x-access-token'
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
	const token = req.headers["x-access-token"].split(" ")[1];
	
	if(token) {
		jwt.verify(token, passportSecret, (err, decoded)=> {
			if(err) return res.json({
				isLoggedIn: false,
		  		message: "Failed to authenticate",
				message: err
			})
			req.user={};
			req.user.id = decoded.id
			req.user.username = decoded.username
			next();
		})
	} else {
		res.json({message:"Incorrect Token Given", isLoggedIn: false})
	}
}

app.get("/getUsername", verifyJWT, (req, res)=>{
	res.json({isLoggedIn: true, username: req.user.username, id: req.user.id})
})

app.get("/getUserInfo", verifyJWT, (req, res) =>{
	User.findById(req.user.id, function(err, foundUser){
		if(err){
			res.json(err);
		} else {
			res.json(foundUser);
		}
	})
})

app.post("/register", async (req, res) =>{
	
	
	const user = req.body;
	console.log(req.body);
	const takenUsername = await User.findOne({username: user.username})
	const takenEmail = await User.findOne({email:user.email})
	
	if(takenUsername || takenEmail){
		res.json({message: "Username or email already taken", redirect:true})
	} else {
		user.password = await bcrypt.hash(req.body.password,10)
		
		const dbUser = new User({
			username: user.username.toLowerCase(),
			email: user.email.toLowerCase(),
			password: user.password
		})
		
		dbUser.save()
		res.json({
			message:"Success",
			isLoggedIn: true
		})
	}
});

app.post("/login", (req, res) =>{
	
	const userCredentials = req.body;
	console.log(req.body);
	User.findOne({username: userCredentials.username})
	.then(dbUser => {
		if(!dbUser){
			return res.json({
				message: "Invalid Username or Password"
			})
		}
		bcrypt.compare(userCredentials.password, dbUser.password)
		.then(isCorrect =>{
			if(isCorrect) {
			const payload = {
				id: dbUser._id,
				username: dbUser.username,
			}
			jwt.sign(
				payload,
				jwtSecret,
				{expiresIn: 86400},
				(err, token) => {
					if(err) return res.json({message:err})
					return res.json({
						message: "Success",
						token: "Bearer " + token
					})
				}
			)
			} else {
				return res.json({
					message: "Invalid Username or Password"
				})
			}
		})
	})
})





// simple route
app.get('/', (req, res) => {
	res.json({ message: 'Welcome to TRULYFANS API' });
});
//get data route


app.get('/data', (req, res) => {
	Post.find().exec((err, document) => {
		if (err) {
			console.log(err);
			res.json(err);
		} else {
			res.json(document);
		}
	});
});


app.get('/posts', (req, res) => {
	Post.find().exec((err, document) => {
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