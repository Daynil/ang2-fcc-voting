'use strict';
const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const passport = require('passport');
const session = require('express-session');
require('dotenv').load();
require('./config/passport')(passport);

// Set up database stuff
const mongoose = require('mongoose');
const Users = require('./models/users');
const Polls = require('./models/polls');

mongoose.connect(process.env.MONGO_URI);

app.use(bodyParser.json());
app.use(morgan('dev', {
	skip: (req, res) => res.statusCode < 400
}));

let pathname = path.join(__dirname, "../public");
app.use( express.static(pathname) );

app.use('/scripts', express.static( path.join(__dirname, '../node_modules') ));
app.use('/js', express.static( path.join(__dirname, '../public/js') ));

app.use(session({
	secret: 'secretRandSessionPass',
	resave: false,
	saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

app.get('/api/polllist', (req, res) => {
/*	Polls
		.find({})
		.exec()
		.then(polls => {
			res.status(200).send(polls);
		});*/
	res.sendFile(path.join(__dirname, './polldata.json'));
});

app.post('/api/newpoll', (req, res) => {
	let newpoll = req.body.newpoll;

	let newQuestion = new Polls({
		creator: newpoll.creator,
		question: newpoll.question,
		choices: newpoll.choices
	});
	newQuestion.save(err => {
		if (err)  {
			console.log(err);
			res.status(400).end(err);
		} else {
			res.status(200).end('new question saved');
		}
	});
});

app.get('/auth/github', passport.authenticate('github'));

app.get('/auth/github/callback', passport.authenticate('github', {successRedirect: '/after-auth'}) );

app.get('/auth/checkCreds', (req, res) => {
	if (req.isAuthenticated()) {
		let userInfo = {
			displayName: req.user.displayName,
			githubID: req.user.githubID,
			username: req.user.username
		}
		res.send({loggedIn: true, user: userInfo});
	}
	else res.send({loggedIn: false, user: null});
});

app.get('/auth/logout', (req, res) => {
	req.logout();
	res.end();
});

// Pass all non-api routes to front-end router for handling
app.get('*', (req, res) => {
	res.sendFile(path.resolve(__dirname, "../public", 'index.html'));
});
let port = process.env.PORT || 3000;
let server = app.listen(port, () => console.log(`Listening on port ${port}...`));