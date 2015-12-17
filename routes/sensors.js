var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

require("../models/temperature");
var temperature = mongoose.model('temperature');


/* GET sensors page. */
router.get('/', function(req, res, next) {

	temperature.aggregate( [ {$sort : {location : -1, updated : -1}}, { $group : { _id : "$location", temperature : {$first : "$temperature"}, humidity : {$first : "$humidity"}, updated : {$first : "$updated"}} } ] ).exec(function(err, info){
		var date1 = new Date();

		for (var i = 0; i < info.length; i++){
				console.log(info[i].updated.getTime());
				console.log(Date.now());

				//compared current time to last db entry - 1200000 milliseconds is 2 minutes
				if(info[i].updated.getTime() > (Date.now() - 120000)){
					info[i].connected = true;
				}
				else {
					info[i].connected = false;
				}

				console.log(info[i].connected);
				
		}

		res.render('sensors', {query : info});
	});

});

router.post('/', function(req, res,next) {

});

module.exports = router;













