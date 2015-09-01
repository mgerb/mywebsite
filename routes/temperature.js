var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
require('../models/temperature');
var info = mongoose.model('temperature');

/* GET home page. */
router.post('/', function(req, res, next) {
	var temperature = req.body.temperature;
	var humidity = req.body.humidity;
	var location = req.body.location;
	var key = req.body.key;

	if(key == "esp1234"){


		var insert = new info({
			temperature: temperature,
			humidity: humidity,
			location: location
		});

		insert.save(function (err) {
			if (err) return handleError(err);

		});

		console.log("--information saved--");

		res.send("Information Logged");

	}

	else{

		console.log("--information not saved--");
		res.send("Invalid Authentication");
	}
	

	
});

module.exports = router;