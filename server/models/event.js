var mongoose = require('mongoose');
var EventSchema = new mongoose.Schema({
	_Userid: String,
	location: String,
	latitude: Number,
	longitude: Number,
	users:[],
	description: String
})
mongoose.model('Event', EventSchema)