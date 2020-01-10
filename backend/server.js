var createError = require('http-errors');

if(process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var Promise = require('bluebird');
var mongoose = require('mongoose');
var passport = require('passport');
var userRoute = require('./routes/users');
var matchRoute = require('./routes/matchmaking');
var cors = require('cors');
var app = express();
app.use(cors());

var mongoURL = process.env.OPENSHIFT_MONGODB_DB_URL || process.env.MONGO_URL,
    mongoURLLabel = "";

// For local dev
// var mongoURL = 'mongodb://localhost:27017/demodb';


if (mongoURL == null) {
  var mongoHost, mongoPort, mongoDatabase, mongoPassword, mongoUser;
  // If using plane old env vars via service discovery
  if (process.env.DATABASE_SERVICE_NAME) {
    var mongoServiceName = process.env.DATABASE_SERVICE_NAME.toUpperCase();
    mongoHost = process.env[mongoServiceName + '_SERVICE_HOST'];
    mongoPort = process.env[mongoServiceName + '_SERVICE_PORT'];
    mongoDatabase = process.env[mongoServiceName + '_DATABASE'];
    mongoPassword = process.env[mongoServiceName + '_PASSWORD'];
    mongoUser = process.env[mongoServiceName + '_USER'];

  // If using env vars from secret from service binding
  } else if (process.env.database_name) {
    mongoDatabase = process.env.database_name;
    mongoPassword = process.env.password;
    mongoUser = process.env.username;
    var mongoUriParts = process.env.uri && process.env.uri.split("//");
    if (mongoUriParts.length == 2) {
      mongoUriParts = mongoUriParts[1].split(":");
      if (mongoUriParts && mongoUriParts.length == 2) {
        mongoHost = mongoUriParts[0];
        mongoPort = mongoUriParts[1];
      }
    }
  }

  if (mongoHost && mongoPort && mongoDatabase) {
    mongoURLLabel = mongoURL = 'mongodb://';
    if (mongoUser && mongoPassword) {
      mongoURL += mongoUser + ':' + mongoPassword + '@';
    }
    // Provide UI label that excludes user id and pw
    mongoURLLabel += mongoHost + ':' + mongoPort + '/' + mongoDatabase;
    mongoURL += mongoHost + ':' +  mongoPort + '/' + mongoDatabase;
  }
}

mongoose.connect(mongoURL, {useNewUrlParser:true});
mongoose.Promise = Promise;

app.use(express.json());
app.use(express.urlencoded({ extended: true}));
// view engine setup


require("./config/passport")(passport);

app.use(logger('dev'));
app.use(cookieParser());


app.use(express.static(path.join(__dirname, 'public')));


app.use('/user', userRoute);
app.use('/match', matchRoute);

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.resolve(__dirname, '..', 'client', 'build')));
    app.get("*", (req, res) => {
      res.sendFile(path.resolve(__dirname, '..', 'client', 'build', 'index.html'));
    });
}

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
  res.json({email: 'aaaaa'});
});


module.exports = app;