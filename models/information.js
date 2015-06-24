var mongoose = require('mongoose');

var infoSchema = new mongoose.Schema({
	number: Number,
	date: Number,
	time: Number,
	message: String
});


mongoose.model('info', infoSchema);