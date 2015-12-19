var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

require("../models/temperature");
var temperature = mongoose.model('temperature');


/* GET sensors page. */
router.get('/allsensors', function(req, res, next) {

	//var location = req.query.location;
	temperature.aggregate([{$group : { _id : {location : "$location", month: {$month: "$updated" }, day: { $dayOfMonth: "$updated" }, year: { $year: "$updated" }},
								max : {$max : "$temperature"},
								min : {$min : "$temperature"}}},
							{$sort : {"_id.month" : -1, "_id.day" : -1, "_id.year" : -1}}]).exec(function(err, info){

			console.log(info);
			res.setHeader('Content-Type', 'application/json');
			res.send(JSON.stringify(info, null, 4));

		});

});

router.get('/sensorbylocation', function(req, res, next) {

	var loc = req.query.location;
	console.log(loc);
	//var location = req.query.location;
	temperature.aggregate([ {$match : {location : loc}},
							{$group : { _id : {location : "$location", month: {$month: "$updated" }, day: { $dayOfMonth: "$updated" }, year: { $year: "$updated" }},
								max : {$max : "$temperature"},
								min : {$min : "$temperature"}}},
							{$sort : {"_id.month" : -1, "_id.day" : -1, "_id.year" : -1}}]).exec(function(err, info){

			console.log(info);
			res.setHeader('Content-Type', 'application/json');
			res.send(JSON.stringify(info, null, 4));

		});

});

router.post('/', function(req, res,next) {

});

module.exports = router;













