var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
require('../models/temperature');
var info = mongoose.model('temperature');

/* GET home page. */
router.get('/', function(req, res, next) {

	var temperature = req.query.temperature;
	var humidity = req.query.humidity;
	var location = req.query.location;
	var key = req.query.key;

	//implement a key for security
  	//the esp8266 will send "nan" (not a number) if it has a faulty temperature read
  	//we do not want to save it if it is not a number
	if(key == "esp1234" && temperature != "nan" && humidity != "nan"){

		//create a new object to insert into the database
		//using mongoose for object modeling
		var insert = new info({
			temperature: temperature,
			humidity: humidity,
			location: location
		});

		//save information in the database
		insert.save(function (err) {
			if (err) return handleError(err);

		});

		console.log("--information saved--");

		//send respnse back
		res.send("Information Logged");

	}

	else{

		console.log("--information not saved--");
		res.send("Invalid Authentication");
	}
	
});

module.exports = router;