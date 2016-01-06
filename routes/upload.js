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

				var write_stream = fs.createWriteStream(folder + file.originalname);
				write_stream.write(file.buffer);

				write_stream.on('error', function(){
					res.send("Error Uploading File");
				});

				write_stream.on('finish', function(){
					res.send("File Uploaded");
				});

				write_stream.end();
			}

			//file already exists
			else {
				res.send("File already exists");
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