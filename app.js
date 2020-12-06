var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

//mongodb
var monk = require('monk');
var db = monk('localhost:27017/Cloud');
//var db = monk('devicimongodb184.westeurope.cloudapp.azure.com:27017/Cloud');

var indexRouter = require('./routes/index');
var query1Router = require('./routes/query1');
var query2Router = require('./routes/query2');
var query3Router = require('./routes/query3');
var query4Router = require('./routes/query4');
var query5Router = require('./routes/query5');
var query6Router = require('./routes/query6');
var query7Router = require('./routes/query7');
var query8Router = require('./routes/query8');
var adminRouter = require('./routes/admin');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function (req, res, next) {
  req.db = db;
  next();
});

app.use('/', indexRouter);
app.use('/query1', query1Router);
app.use('/query2', query2Router);
app.use('/query3', query3Router);
app.use('/query4', query4Router);
app.use('/query5', query5Router);
app.use('/query6', query6Router);
app.use('/query7', query7Router);
app.use('/query8', query8Router);
app.use('/admin', adminRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
