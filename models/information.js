var mongoose = require('mongoose');

var infoSchema = new mongoose.Schema({
	number: String,
	date: Date,
	time: String,
	message: String,
	updated: {type: Date, default: Date.now}
});


mongoose.model('info', infoSchema);