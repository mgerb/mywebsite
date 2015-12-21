var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

require("../models/temperature");
var temperature = mongoose.model('temperature');


/* GET sensors page. */
router.get('/', function(req, res, next) {

	temperature.aggregate( [ {$sort : {location : -1, updated : -1}}, { $group : { _id : "$location", temperature : {$first : "$temperature"}, humidity : {$first : "$humidity"}, updated : {$first : "$updated"}} } ] ).exec(function(err, info){

		//get month for each entry and convert 24 hour time to US time
		//also check to see if device has sent a data point in past 5 minutes
		//if not will show up as disconnected
		for (var i = 0; i < info.length; i++){
				var monthNames = ["January", "February", "March", "April", "May", "June",
  									"July", "August", "September", "October", "November", "December"];

				var hours = info[i].updated.getHours();
				var minutes = info[i].updated.getMinutes();
				var month = monthNames[info[i].updated.getMonth()];
				var date = info[i].updated.getUTCDate();
				var year = info[i].updated.getUTCFullYear();

				var dateString = month + " " + date + ", " + year;

				var loc = info[i]._id;
				
				var info_link = "/sensors/information?location="

				if (loc != null){
					loc = loc.split().join("+");
					 info_link += loc;
				}

				info[i].info_link = info_link;
				
				//converting 24 hours time to AM or PM
				if (hours == 0){
					hours = 12;
					info[i].lastUpdate = dateString + " - " + hours + ":" + minutes + " AM";
				}
				else if (hours < 12){
					info[i].lastUpdate = dateString + " - " + hours + ":" + minutes + " AM";
				}
				else if (hours == 12){
					info[i].lastUpdate = dateString + " - " + hours + ":" + minutes + " PM";
				}
				else{
					hours = hours - 12;
					info[i].lastUpdate = dateString + " - " + hours + ":" + minutes + " PM";
				}

				//compared current time to last db entry - 1200000 milliseconds is 2 minutes
				if(info[i].updated.getTime() > (Date.now() - 350000)){
					info[i].connected = true;
				}
				else {
					info[i].connected = false;
				}

				
				
		}

		res.render('sensors', {query : info});
	});


});

router.get('/information', function(req, res, err){

	var sensor_location = req.query.location;

	if (sensor_location == null){
		res.redirect('/404');
	}
	else{
			temperature.aggregate([{$project : {location : "$location", year : {$year : "$updated"}, month : {$month : "$updated"}}},
									{$match : {location : sensor_location}},
									{$group : {_id : {year : "$year", month : "$month", location : "$location"}}},
									{$sort : {"_id.year" : -1, "_id.month" : -1}}]).exec(function(err, info){

			//generate list of unique years to display in dropdown menu
			var years_list = [];

			for (var i in info){
				if (years_list.indexOf(info[i]._id.year) > -1){

				}
				else {
					years_list.push(info[i]._id.year);
				}
			}

			res.render('sensor_information', {info, years_list});

		});
		
	}
});

module.exports = router;













