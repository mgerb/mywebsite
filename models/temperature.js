var mongoose = require('mongoose');

var temperatureSchema = new mongoose.Schema({
	temperature: {type : Number, default : null},
	humidity: {type : Number, default : null},
	location: {type : String, default : "Undefined Location"},
	updated: {type: Date, default: Date.now}
});


mongoose.model('temperature', temperatureSchema);
