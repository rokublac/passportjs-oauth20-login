// jshint esversion:6

// get Router from express module
const router = require('express').Router();
const passport = require('passport');

// auth login
router.get('/login', (req, res) => {
	res.render('login');
});

// auth logout
router.get('/logout', (req, res) => {
	// handle with passport.js
	res.send('loggin out');
});

// auth with Google
router.get('/google', passport.authenticate('google', {
	scope: ['profile']
}));

// callback route for google to redirect to
router.get('/google/redirect', passport.authenticate('google'), (req,res) => {
	res.send("hello, you have reached a callback URI");
});

module.exports = router;