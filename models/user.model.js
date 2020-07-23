var mongoose = require('mongoose');
var userSchema = new mongoose.Schema({
	name: String,
	email: String,
	password: String,
	phone: String,
	role: Number,
	created_at: Date,
	updated_at: Date
});

var User = mongoose.model('User', userSchema, 'users');

module.exports = User;