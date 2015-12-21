var mongoose = require('mongoose');

var temperatureSchema = new mongoose.Schema({
	temperature: Number,
	humidity: Number,
	location: {type : String, default : "Undefined Location"},
	updated: {type: Date, default: Date.now}
});


mongoose.model('temperature', temperatureSchema);