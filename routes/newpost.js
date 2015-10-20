var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var multer = require('multer')();
var fs = require('fs');

require('../models/posts');
var info = mongoose.model('posts');

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('newpost');
});

router.post('/', multer.single('file'), function(req, res,next) {
	var title = req.body.title;
	var date = req.body.date;
	var intro = req.body.intro;
	var key = req.body.key;

	var file = req.file;

	var entry = new info({
		title: title,
		date: date,
		intro: intro,
		path: ('./blogposts/' + file.originalname),
		fileName: file.originalname
	});

	if (key == "Chimera#55.com"){

		fs.access(('./views/blogposts/' + file.originalname), fs.F_OK, function(err){

			//if file doesn't already exist
			if (err){
				fs.writeFile(('./views/blogposts/' + file.originalname), file.buffer, function(err) {
					if (!err){

						//save data in database and send response to user
						entry.save(function (err, saved) {
							if (!err) {
								res.render('newpost', {message : "Submission Accepted"});
							}
						});
						
					}

					else {
						res.render('newpost', {message : "Error saving file"});
					}
				});
			}

			//file already exists
			else {
				res.render('newpost', {message : "File already exists"});
			}
		});

	}

	else {
		res.render('newpost', {message : "Invalid Key"});
	}
});

module.exports = router;