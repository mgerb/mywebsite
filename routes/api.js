var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

require("../models/temperature");
var temperature = mongoose.model('temperature');


//api to return the max and min temps of each day based on location
router.get('/allsensors', function(req, res, next) {

	//var location = req.query.location;
	temperature.aggregate([{$group : { _id : {location : "$location", month: {$month: "$updated" }, day: { $dayOfMonth: "$updated" }, year: { $year: "$updated" }},
								max : {$max : "$temperature"},
								min : {$min : "$temperature"}}},
							{$sort : {"_id.month" : 1, "_id.day" : 1, "_id.year" : 1}}]).exec(function(err, info){

			console.log(info);
			res.setHeader('Content-Type', 'application/json');
			res.send(JSON.stringify(info, null, 4));

		});

});

router.get('/sensorbylocation/year', function(req, res, next) {

	var loc = req.query.location;
	var ye = req.query.year;

	if (ye == null){
		var date = new Date();
		ye = date.getFullYear();
	}

	//query finds a entries in a collection based on location and the year specified
	//they are then grouped by date and sorted by date as well
	temperature.aggregate([ {$project : {location : 1, temperature : 1, year : {$year : "$updated"}, month : {$month : "$updated"}, day : {$dayOfMonth : "$updated"}}},
							{$match : {location : loc, year : parseInt(ye)}},
							{$group : {_id : {location : "$location", day: "$day", month : "$month", year : "$year"},
								max : {$max : "$temperature"},
								min : {$min : "$temperature"}}},
							{$sort : {"_id.month" : 1, "_id.day" : 1}}]).exec(function(err, info){

			console.log(info);
			res.setHeader('Content-Type', 'application/json');
			res.send(JSON.stringify(info, null, 4));

		});

});

router.get('/sensorbylocation/month', function(req, res, next) {

	var loc = req.query.location;
	var ye = req.query.year;
	var mo = req.query.month;
	var date = new Date();

	if (ye == null){
		ye = date.getFullYear();
	}

	if (mo == null){
		mo = date.getMonth();
	}

	console.log(ye + "/" + mo);
	//query finds a entries in a collection based on location and the year specified
	//they are then grouped by date and sorted by date as well
	temperature.aggregate([ {$project : {location : 1, temperature : 1, year : {$year : "$updated"}, month : {$month : "$updated"}, day : {$dayOfMonth : "$updated"}}},
							{$match : {location : loc, year : parseInt(ye), month : parseInt(mo)}},
							{$group : {_id : {location : "$location", day: "$day", month : "$month", year : "$year"},
										max : {$max : "$temperature"},
										min : {$min : "$temperature"}}},
							{$sort : {"_id.day" : 1}}]).exec(function(err, info){

			console.log(info);
			res.setHeader('Content-Type', 'application/json');
			res.send(JSON.stringify(info, null, 4));

		});

});


module.exports = router;





