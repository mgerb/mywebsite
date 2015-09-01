var mongoose = require('mongoose');

var temperatureSchema = new mongoose.Schema({
	temperature: String,
	humidity: String,
	located: String,
	updated: {type: Date, default: Date.now}
});


mongoose.model('temperature', temperatureSchema);