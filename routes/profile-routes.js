// jshint esversion:6
const router = require('express').Router();


const authCheck = (req, res, next) => {
	if(!req.user){
		// if user is not logged in
		res.redirect('/auth/login');
	} else {
		// if user is logged in, continue to next middleware
		next();
	}
};

router.get('/', authCheck, (req, res) => {
	// res.send(`Welcome, ${req.user.username}!`);
	res.render('profile', { user:req.user });

});

module.exports = router;