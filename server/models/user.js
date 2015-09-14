var mongoose = require('mongoose');
var UserSchema = new mongoose.Schema({
	password: String,
	fName: String,
	lName: String,
	email: String
})
mongoose.model('User', UserSchema)