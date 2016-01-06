var express = require('express');
var router = express.Router();
var multer = require('multer')();
var fs = require('fs');

/* GET home page. */
router.get('/', function(req, res, next) {
	
	var dir = './public/uploads';

	renderPage(res, null);

});

router.post('/', multer.single('file'), function(req, res,next) {
	
	var key = req.body.key;
	var file = req.file;
	var folder = './public/uploads/';

	if (key == "Chimera#55.com"){

		fs.access((folder + file.originalname), fs.F_OK, function(err){

			//if file doesn't already exist
			if (err){
				fs.writeFile((folder + file.originalname), file.buffer, function(err) {
					if (!err){
						
						renderPage(res, 'File Uploaded');
						
					}

					else {
						renderPage(res, 'Error Saving File');
					}
				});
			}

			//file already exists
			else {
				renderPage(res, 'File Already Exists');
			}
		});

	}

	else {
		renderPage(res, 'Invalid Key');
	}
});

function renderPage(res, message){

	var dir = './public/uploads';

	fs.readdir(dir, function(err, files){
		res.render('upload', {files : files, message : message});
	});

}

module.exports = router;