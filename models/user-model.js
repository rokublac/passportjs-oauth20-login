// jshint esversion:6
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create schema
const userSchema = new Schema({
	username: String,
	googleid: String
});

// create model. mlab will pluralize the model name ie 'users'
const User = mongoose.model('user', userSchema);

module.exports = User;