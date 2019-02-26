// modules for the web server
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// modules for authentication
var session = require('express-session');
var passport = require('passport');
var passportLocal = require('passport-local');
var localStrategy = passportLocal.Strategy;
var flash = require('connect-flash'); // displaying errors / login messages


// database setup
var mongoose = require('mongoose');
var DB = require('./db');

// point Mongoose to the DB URI
mongoose.connect(DB.URI);

var mongoDB = mongoose.connection;
mongoDB.on('error', console.error.bind(console, 'Connection Error:'));
mongoDB.once('open', ()=> {
  console.log("Connected to MongoDB...");
});

var indexRouter = require('../routes/index');
var bookRouter = require('../routes/');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../../public')));
app.use(express.static(path.join(__dirname, '../../node_modules')));

// setup session
app.use(session({
  secret: "SomeSecret",
  saveUninitialized: true,
  resave: true
}));

// initialize passport and flash
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use('/', indexRouter);
app.use('/contact-list', contactRouter);

// Passport User Configuration

// create a user model
var UserModel = require('../models/users');
var User = UserModel.User;

// implement a user strategy
passport.use(User.createStrategy());

// serialize and deserialize user info
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

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
  res.render('error')
});

module.exports = app;
