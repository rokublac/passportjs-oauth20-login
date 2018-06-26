// jshint esversion:6

const passport = require('passport');
const GoogleStategy = require('passport-google-oauth20');
const keys =  require('./keys');
const User = require('../models/user-model');


passport.serializeUser((user, done) => {
	// in mongob we created a collection called 'user'
	// null is the error check - returns null if error occurs
	done(null, user.id);
});

passport.deserializeUser((id, done) => {
	User.findById(id).then((user) => {
		done(null, user);
	});
});

passport.use(
	new GoogleStategy({
	// strategy options, id and secret received from google console developer google+ API
	callbackURL: '/auth/google/redirect',
	clientID: keys.google.clientID,
	clientSecret: keys.google.clientSecret
	}, (accessToken, refreshToken, profile, done) => {
		// check if user already exists in our database
		User.findOne({googleid: profile.id}).then((currentUser) => {
			if(currentUser){
				// user exists in database
				console.log('user is:' + currentUser);
				done(null, currentUser);
			} else {
				// user does not exist in database
				new User({
					username: profile.displayName,
					googleid: profile.id,
					thumbnail: profile._json.image.url
				}).save().then((newUser) => {
					console.log('new user created:' + newUser);
					done(null, newUser);
				});
			}
		});
	})
);

