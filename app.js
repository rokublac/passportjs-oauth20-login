// jshint esversion:6

const express = require('express');
const authRoutes = require('./routes/oauth-routes');
const passportSetup = require('./config/passport-setup');
const mongoose = require('mongoose');
const keys = require('./config/keys');

// invoke express to make an application
const app = express();
const port = 3000;

// set up view engine
app.set("view engine", 'ejs');

// connect to mongodb
mongoose.connect(keys.mongodb.dbURI, () => {
	console.log('connected to mongodb')
});

// set up routes
app.use('/auth', authRoutes);

// create home route
app.get('/', (req, res) => {
	res.render('home');
});

app.listen(port, () => {
	console.log('app now listening for requests on port 3000')
});
