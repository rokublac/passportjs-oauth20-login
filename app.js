// jshint esversion:6

// epxress module
const express = require('express');
// routes
const authRoutes = require('./routes/oauth-routes');
const profileRoutes = require('./routes/profile-routes');
// passport and it's configuration
const passport = require('passport');
const passportSetup = require('./config/passport-setup');
// mongoose - mongodb
const mongoose = require('mongoose');
// google, mongodb and cookie keys
const keys = require('./config/keys');
// cookie-session module
const cookieSession = require('cookie-session');


// invoke express to make an application
const app = express();
const port = 3000;

// set up view engine
app.set("view engine", 'ejs');

app.use(cookieSession({
	// max age of cookie - in this case 1 day. Must turn 1 day into milliseconds
	maxAge: 24 * 60 * 60 * 1000,
	// key array to be encrypted - retrieved from keys module
	keys: [keys.session.cookieKey]
}));

// inistalize passport
app.use(passport.initialize());
app.use(passport.session());

// connect to mongodb
mongoose.connect(keys.mongodb.dbURI, () => {
	console.log('connected to mongodb');
});

// set up routes
app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);

// create home route
app.get('/', (req, res) => {
	res.render('home', { user:req.user });
});

app.listen(port, () => {
	console.log('app now listening for requests on port 3000')
});
