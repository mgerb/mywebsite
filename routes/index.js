var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
require('../models/information');
var info = mongoose.model('info');

/* GET home page. */
router.get('/', function(req, res, next) {
	var getString = req.param("test");
	var find = {number : "555-555-5555"};
  	res.render('index', {findParams : find});
});

router.post('/information', function(req, res,next) {
	var number = req.param("number");
	var date = req.param("date");
	var time = req.param("time");
	var message = req.param("message");

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
});

router.post('/search', function(req, res, next) {
	var searchNumber = req.param("searchNumber");

	info.findOne({'number' : searchNumber}, "number date time message updated", function(err, seach) {
		if (err) return handleError(err);
	});

	res.render('index', {findParams : search});

});

module.exports = router;
