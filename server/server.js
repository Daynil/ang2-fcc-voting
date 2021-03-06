'use strict';
const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const compress = require('compression');
const passport = require('passport');
const session = require('express-session');
const _ = require('lodash');
require('dotenv').load();
require('./config/passport')(passport);

// Set up database stuff
const mongoose = require('mongoose');
const Users = require('./models/users');
const Polls = require('./models/polls');

mongoose.connect(process.env.MONGO_URI);

// Future: check for production first?
app.use(compress());

app.use(bodyParser.json());
app.use(morgan('dev', {
	skip: (req, res) => {
		return res.statusCode < 400 || req.method === 'POST';
	}
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
	Polls
		.find({})
		.exec()
		.then(polls => {
			res.status(200).send(polls);
		});
	//DEBUG DATA: res.sendFile(path.join(__dirname, './polldata.json'));
});

app.post('/api/newpoll', (req, res) => {
	let newpoll = req.body;

	let newQuestion = new Polls({
		creator: newpoll.creator,
		question: newpoll.question,
		choices: newpoll.choices,
		voters: []
	});
	newQuestion.save(err => {
		if (err)  {
			console.log(err);
			res.status(400).end(err);
		} else {
			res.status(200).json({ poll: newQuestion });
		}
	});
});

app.post('/api/submitvote', (req, res) => {
	let vote = req.body;
	
	Polls
		.findById(vote.poll._id)
		.exec()
		.then(poll => {
			let userIP = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
			let voter = vote.user ? vote.user.githubID : userIP;

			// Check if user has already voted
			let existingVoter = _.find(poll.voters, o => {
				return o === voter;
			});
			if (typeof existingVoter != 'undefined') res.status(200).json({poll: poll, duplicate: true});
			else {
				let votedQ = _.find(poll.choices, o => o.text === vote.choiceText);
				
				// Check for custom poll choice
				if (typeof votedQ != 'undefined') {
					votedQ.votes++;
					poll.voters.push(voter);
				}
				else {
					poll.choices.push({
						text: vote.choiceText,
						votes: 1
					});
					poll.voters.push(voter);
				}
				poll.save(err => {
					if (err) {
						console.log(err);
						res.status(400).end(err);
					} else {
						res.status(200).json({poll: poll, duplicate: false});
					}
				});
			}
		})
		.catch(err => console.log(err));
});

app.post('/api/deletepoll', (req, res) => {
	let poll = req.body.poll;
	
	Polls
		.remove({ _id: poll._id }, err => {
			console.log(err);
			if (err) {
				console.log(err);
				res.status(500).json({err: err});
			}
			else res.status(200).json({poll: poll});
		})
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