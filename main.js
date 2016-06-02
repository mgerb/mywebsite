require('./models/currentdata');
require('./models/olddata');
var mongoose = require('mongoose');
var newData = mongoose.model('currentdata');
var oldData = mongoose.model('olddata');
var nodemailer = require('nodemailer');

// create reusable transporter object using SMTP transport
var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: '',
        pass: ''
    }
});

// NB! No need to recreate the transporter object. You can use
// the same transporter object for all e-mails



// main loop
exports.queryLoop = setInterval(function(){
		var query = newData.find({});

		query.select("id number date time message");

		query.exec(function (err, callback) {
			if (err) return handleError(err);
			callback.forEach(function(call){
				var mongoDate = new Date(call.date);

				//if date is in the future
				if(mongoDate >= Date.now()){
					console.log(mongoDate + "\n" + "Message: " + call.message + "\n\n" + "Number: " + call.number + "\n\n");
				}

				//if date is in the past <mgnodemailer@gmail.com>
				else {
					// send email
					var mailOptions = {
					    from: 'MG Node Mail', // sender address
					    to: call.number, // list of receivers
					    text: call.message // plaintext body
					};

					// send mail with defined transport object
					transporter.sendMail(mailOptions, function(error, info){
					    if(error){
					        console.log(error);
					    }else{
					        console.log('Message sent: ' + info.response);
					    }
					});

					//save old info in other schema
					var entry = new oldData({
						number	: call.number,
						date	: call.date,
						time	: call.time,
						message	: call.message
					});

					entry.save(function(err, entry) {
					if(err) {
						return console.error(err);
					}
					else {
						console.log("date expired - removing\n" + mongoDate + "\n\n");
						newData.find({_id : call.id}).remove().exec();
					}
					console.dir(entry);
					});
				}
			});
		});

}, 5000);


