var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
require('../models/information');
var info = mongoose.model('info');

/* GET home page. */
router.get('/', function(req, res, next) {
	var getString = req.param("test");
  res.render('index');
});

router.post('/', function(req, res,next) {
	var number = req.param("number");
	var date = req.param("date");
	var time = req.param("time");
	var message = req.param("message");

	var entry = new info({
		number: 234,
		date: 234,
		time: 234,
		message: "test"
	});

	entry.save(function(err, entry) {
		if(err) return console.error(err);
		console.dir(entry);
	});

  	console.log(entry);
  	res.render('index');
});

module.exports = router;
