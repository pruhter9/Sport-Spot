var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var UserSchema = new mongoose.Schema({
	password: String,
	firstName: String,
	lastName: String,
	email: String,
	userName: String,
	events:[{type: Schema.Types.ObjectId, ref: 'Event'}]

})
mongoose.model('User', UserSchema)