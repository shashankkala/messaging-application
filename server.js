var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var moment = require('moment');
var User = require('./model/User.model');
var Message = require('./model/Message.model');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('./public'));
app.use(express.static('./public/views'));


var db = 'mongodb://localhost/mailer';
mongoose.connect(db);

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + '/public/views/index.html'));
});

app.post('/addUser', function(req, res){
	var newUser = new User();
	
	newUser.username = req.body.username;
	newUser.password = req.body.password;
	newUser.active = true;
	
	newUser.save(function(err, user){
		if(err){
			console.log(err.message);
			req.body.error = err;
			res.status(406).send(req.body);
		}
		else{
			res.status(200).send(user);
		}
	})
});

app.post('/validateUser', function(req, res){
	var userName = req.body.username;
	var password = req.body.password;
	
	User.findOne({ username: userName }, function(err, user) {
		if (err){
			req.body.error = err.message;
			res.status(406).send(req.body);
		}
		
		else if(user){
			user.comparePassword(password, function(err, isMatch) {
				if (err){
					req.body.error = err.message;
					res.status(406).send(req.body);
				}
				else{
					console.log(isMatch);
					if(isMatch == false){
						req.body.error = "Wrong password";
						res.status(406).send(req.body);
					}
					else{
						req.body.error = "";
						res.status(200).send(req.body);
					}
				}
			});
		}
		else {
			console.log("User not found");
			req.body.error = "User with the entered username does not exist";
			res.status(406).send(req.body);
		}
	});
});

app.post('/sendMail', function(req, res){
	var recipient = req.body.recipient;
	
	User.findOne({ username: recipient }, function(err, user) {
		if (err){
			req.body.error = err.message;
			res.status(406).send(req.body);
		}
		
		else if(user){
			var newMessage = new Message();
			newMessage.recipient = req.body.recipient;
			newMessage.sender = req.body.sender;
			newMessage.message = req.body.message;
			newMessage.timestamp = moment().format('Do MMM YYYY, HH:mm:ss');
			newMessage.active = true;
			
			newMessage.save(function(err, message){
				if(err){
					console.log(err.message);
					req.body.error = err.message;
					res.status(406).send(req.body);
				}
				else{
					res.status(200).send(message);
				}
			})
		}
		else {
			console.log("Invalid recipient");
			req.body.error = "Recipient does not exist";
			res.status(406).send(req.body);
		}
	});
});

app.get('/inMails', function(req, res){
	Message.find({
		recipient : req.query.user
	})
	.exec(function(err, message){
		if(err){
			req.body.reason = err.reason;
			res.status(406).send(req.body);
		}
		else{
			res.status(200).send(message);
		}
	})
});

app.get('/outMails', function(req, res){
	Message.find({
		sender : req.query.user
	})
	.exec(function(err, message){
		if(err){
			req.body.reason = err.reason;
			res.status(406).send(req.body);
		}
		else{
			res.status(200).send(message);
		}
	})
});

app.get('/recipientList', function(req, res){
	User.find({
		username : new RegExp("^"+req.query.queryString, "i")
	})
	.exec(function(err, user){
		if(err){
			req.body.error = err.message;
			res.status(406).send(req.body);
		}
		else{
			res.status(200).send(user);
		}
	})
});

app.listen(3030);

console.log('server running at port 3030...');