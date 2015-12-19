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

router.get('/sensorbylocation', function(req, res, next) {

	var loc = req.query.location;
	var year = req.query.year;

	if (year == null){
		var date = new Date();
		year = date.getFullYear();
	}

	//query finds a entries in a collection based on location and the year specified
	//they are then grouped by date and sorted by date as well
	temperature.aggregate([ {$match : {location : loc, updated : {$gte : new Date('1 Jan, ' + year), $lt : new Date('1 Jan ' + year +1)}}},
							{$group : { _id : {location : "$location", month: {$month: "$updated" }, day: { $dayOfMonth: "$updated" }, year: { $year: "$updated" }},
								max : {$max : "$temperature"},
								min : {$min : "$temperature"}}},
							{$sort : {"_id.month" : 1, "_id.day" : 1, "_id.year" : 1}}]).exec(function(err, info){

			console.log(info);
			res.setHeader('Content-Type', 'application/json');
			res.send(JSON.stringify(info, null, 4));

		});

});

router.post('/', function(req, res,next) {

});

module.exports = router;













