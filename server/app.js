var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
const passport= require('passport');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const productRouter = require('./routes/productRouter');
const uploadRouter = require('./routes/uploadRouter');
const favoriteRouter = require('./routes/favoriteRouter');
const config = require('./config');

const url = config.mongoUrl;

var app = express();

app.all('*',(req,res,next)=>{
  console.log('raghvendra .......',req.body);
  next();

  /*if(req.secure) {
    next();
  }
  else {
    console.log('raghvenda', 'https://'+req.hostname+':'+app.get('secPort')+req.url);
    res.redirect(307,'https://'+req.hostname+':'+app.get('secPort')+req.url);
  }*/
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use(passport.initialize());

app.use('/', indexRouter);
app.use('/imageupload', uploadRouter);
app.use('/users', usersRouter);
app.use('/products',productRouter);
app.use('/favorites',favoriteRouter);

const connect = mongoose.connect(url);
connect.then((db) => {
    console.log("Connected correctly to server");
}, (err) => { console.log(err); });

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
