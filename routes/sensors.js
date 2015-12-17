var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

require("../models/temperature");
var temperature = mongoose.model('temperature');


/* GET sensors page. */
router.get('/', function(req, res, next) {

	temperature.aggregate( [ {$sort : {location : -1, updated : -1}}, { $group : { _id : "$location", temperature : {$first : "$temperature"}, humidity : {$first : "$humidity"}, updated : {$first : "$updated"}} } ] ).exec(function(err, info){

		for (var i = 0; i < info.length; i++){
				var monthNames = ["January", "February", "March", "April", "May", "June",
  									"July", "August", "September", "October", "November", "December"];

				var hours = info[i].updated.getHours();
				var minutes = info[i].updated.getMinutes();
				var month = monthNames[info[i].updated.getMonth()];
				var date = info[i].updated.getUTCDate();
				var year = info[i].updated.getUTCFullYear();

				var dateString = month + " " + date + ", " + year;

				//converting 24 hours time to AM or PM
				if (hours < 12){
					info[i].lastUpdate = dateString + " - " + hours + ":" + minutes + " AM (ET)";
				}
				else if (hours == 12){
					info[i].lastUpdate = dateString + " - " + hours + ":" + minutes + " PM (ET)";
				}
				else{
					hours = hours - 12;
					info[i].lastUpdate = dateString + " - " + hours + ":" + minutes + " PM (ET)";
				}

				//compared current time to last db entry - 1200000 milliseconds is 2 minutes
				if(info[i].updated.getTime() > (Date.now() - 120000)){
					info[i].connected = true;
				}
				else {
					info[i].connected = false;
				}

				
				
		}

		res.render('sensors', {query : info});
	});


});

router.post('/', function(req, res,next) {

});

module.exports = router;













