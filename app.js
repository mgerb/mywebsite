var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var success = require('./routes/success');
var temperature = require('./routes/temperature');
var newpost = require('./routes/newpost');
var sensors = require('./routes/sensors');
var api = require('./routes/api');
var upload = require('./routes/upload');

var mongoose = require('mongoose');
var mainLoop = require('./main');


var app = express();
mongoose.connect('mongodb://localhost/sitedb');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
  console.log("connected to database");
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/success', success);
app.use('/temperature', temperature);
app.use('/newpost', newpost);
app.use('/sensors', sensors);
app.use('/api', api);
app.use('/upload', upload);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  //var err = new Error('Not Found');
  //err.status = 404;
  res.status(404);

    // respond with html page
  if (req.accepts('html')) {
    res.render('404', { url: req.url });
    return;
  }

  // respond with json
  if (req.accepts('json')) {
    res.send({ error: 'Not found' });
    return;
  }

  // default to plain-text. send()
  res.type('txt').send('Not found');
  
  //next(err);
});

// error handlers

// development error handler
// will print stacktrace

/*
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}
*/

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

//////////////////Main program loop //////////////////
mainLoop.queryLoop;

module.exports = app;