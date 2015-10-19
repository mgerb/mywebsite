var mongoose = require('mongoose');

var postsSchema = new mongoose.Schema({
	title: String,
	date: Date,
	intro: String,
	file: String,
	updated: {type: Date, default: Date.now}
});


mongoose.model('posts', postsSchema);