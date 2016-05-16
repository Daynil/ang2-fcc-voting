'use strict';

let GitHubStrategy = require('passport-github').Strategy;
let User = require('../models/users');
let configAuth = require('./auth');

module.exports = (passport) => {
    passport.serializeUser( (user, done) => done(null, user.githubID));

    passport.deserializeUser( (id, done) => {
        User.findOne({ 'githubID': id }, (err, user) => done(err, user));
    });

    passport.use(new GitHubStrategy({
            clientID: configAuth.githubAuth.clientID,
            clientSecret: configAuth.githubAuth.clientSecret,
            callbackURL: configAuth.githubAuth.callbackURL
        },
        (token, refreshToken, profile, done) => {

            User.findOne({ 'githubID': profile.id }, (err, user) => {
                if (err) return done(err);
                if (user) return done(null, user);
                else {
                    let newUser = new User();

                    newUser.githubID = profile.id;
                    newUser.displayName = profile.displayName;
                    newUser.username = profile.username;

                    newUser.save( (err) => {
                        if (err) throw err;
                        return done(null, newUser);
                    });
                }
            });
        }));
}