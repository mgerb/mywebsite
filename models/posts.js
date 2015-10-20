var mongoose = require('mongoose');

var postsSchema = new mongoose.Schema({
	title: String,
	date: String,
	intro: String,
	path: String,
	fileName: String,
	updated: {type: Date, default: Date.now}
});


mongoose.model('posts', postsSchema);