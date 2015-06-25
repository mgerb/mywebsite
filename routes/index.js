var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
require('../models/currentdata');
var info = mongoose.model('currentdata');

/* GET home page. */
router.get('/', function(req, res, next) {
  	res.render('index');
});

router.post('/', function(req, res,next) {
	
	//check to see which form is being submitted
	var checkPage = req.body.searchNumber;

	//if searching for number
	if (typeof checkPage != 'undefined'){

		var searchNumber = req.param("searchNumber");

		var query = info.find({'number' : searchNumber});

		query.select("number date time message updated");

		query.exec(function (err, callback) {
			if (err) return handleError(err);
			else {
				console.log(callback);
				res.render('index', {findParams : callback});
			}
		});

		
	}

	//if submitting records
	else {
		
		var number = req.body.number;
		var date = new Date(req.body.date);
		var time = req.body.time;
		var message = req.body.message;
		var carrier = req.body.carrier;
		console.log("------------------------------" + carrier);
		number = number.replace("-", "");
		number = number.replace("-", "");
		number = number.concat(carrier);

		date.setHours(get24Hours(time));
		date.setMinutes(getMinutes(time));
		console.log("------------------ " + number);

		var entry = new info({
			number: number,
			date: date,
			time: time,
			message: message
		});

		entry.save(function(err, entry) {
			if(err) return console.error(err);
			console.dir(entry);
		});

	  	console.log(entry);
	  	res.render('index');
  }
});

router.post('/search', function(req, res, next) {
	

});

module.exports = router;


function get24Hours(time){
	var getAMPM = time.substring((time.length - 2), time.length);
	var getHours = parseInt(time.substring(0,2));

	//if time is in the am and greater than 12:00am
	if (getAMPM == 'am' && getHours < 12){
		return (parseInt(time.substring(0,time.indexOf(':'))));
	}
	//if time is between 12:00am and 1:00am
	else if (getAMPM == 'am' && getHours == 12){
		return 0;
	}
	//return hours greater than 12
	else if (getAMPM == 'pm' && getHours < 12) {
		return (parseInt(time.substring(0,time.indexOf(':'))) + 12);
	}
	//return hour if noon
	if (getAMPM == 'pm' && getHours == 12) {
		return 12;
	}	
}

function getMinutes(time){
	var minutes = parseInt(time.substring(time.indexOf(':') + 1, time.length -2));
	return minutes;
}