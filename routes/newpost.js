var express = require('express');
var router = express.Router();
var multer = require('multer')();
var fs = require('fs');

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('newpost');
});

router.post('/', multer.single('file'), function(req, res,next) {
	
	var key = req.body.key;
	var file = req.file;
	var postsFolder = './public/posts/';

	if (key == "Chimera#55.com"){

		fs.access((postsFolder + file.originalname), fs.F_OK, function(err){

			//if file doesn't already exist
			if (err){
				fs.writeFile((postsFolder + file.originalname), file.buffer, function(err) {
					if (!err){
						
						res.send("Submission Accepted");
						
					}

					else {
						res.send("Error saving file");
					}
				});
			}

			//file already exists
			else {
				res.send("File already exists");
			}
		});

	}

	else {
		res.send("Invalid Key");
	}
});

module.exports = router;