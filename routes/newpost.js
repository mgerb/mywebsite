var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

require('../models/posts');
var info = mongoose.model('posts');

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('newpost');
});

router.post('/', function(req, res,next) {
	var title = req.body.title;
	var date = req.body.date;
	var intro = req.body.intro;
	var key = req.body.key;


	if (key == "Chimera#55.com"){






		res.render('newpost', {message : "Submission Accepted"});
	}

	else {
		res.render('newpost', {message : "Invalid Key"});
	}
});

module.exports = router;