var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

require("../models/temperature");
var temperature = mongoose.model('temperature');


/* GET sensors page. */
router.get('/tempsensors', function(req, res, next) {

	var location = request.query.location;

	
	temperature.aggregate([ {$sort : {location : -1, updated : -1}}, 
		{ $group : { _id : {location : "$location", month: {$month: "$updated" }, day: { $dayOfMonth: "$updated" }, year: { $year: "$updated" }},
						max : {$max : "$temperature"},
						min : {$min : "$temperature"}}}]).exec(function(err, info){

			console.log(info);
			res.setHeader('Content-Type', 'application/json');
			res.send(JSON.stringify(info, null, 4));

		});





	
});

router.post('/', function(req, res,next) {

});

module.exports = router;













