var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var eventSchema = new mongoose.Schema({
	_user: {type: Schema.ObjectId, ref: 'User'},
	title: String,
	address: String,
	latitude: Number,
	longitude: Number,
	users:[{type: Schema.Types.ObjectId, ref: 'User'}],
	information: String,
	created_at: {type: Date, default: new Date},
	date: Date,
	messages: [],
	activity:String
})
mongoose.model('Event', eventSchema)