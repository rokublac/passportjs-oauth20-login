// jshint esversion:6

// get Router from express module
const router = require('express').Router();
const passport = require('passport');

// auth login
router.get('/login', (req, res) => {
	res.render('login', { user:req.user });
});

// auth logout
router.get('/logout', (req, res) => {
	// passport log out and then redirect to homepage
	req.logout();
	res.redirect('/');
});

// auth with Google
router.get('/google', passport.authenticate('google', {
	scope: ['profile']
}));

// callback route for google to redirect
router.get('/google/redirect', passport.authenticate('google'), (req,res) => {
	// res.send(req.user);
	res.redirect('/profile/');
});

module.exports = router;