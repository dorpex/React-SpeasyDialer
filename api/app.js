var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
// require('./utils/leads/import/importLists-3')
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var marketingRouter = require('./routes/marketing');
var leadsRouter = require('./routes/leads');

require('./models/lead')
const ListDb = require('./models/list')

// my requires
var testAPIRouter = require("./routes/testAPI");
var usersApiRouter = require("./routes/users");

var cors = require("cors");
require('./db/mongoose.js');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



// my app use
app.use(cors());
//routers
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use("/testAPI", testAPIRouter);
app.use('/user', usersApiRouter)
app.use('/marketing', marketingRouter)
app.use('/leads' , leadsRouter)
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

console.log(1);

setTimeout(() => {
  console.log(2);
},  5000);
module.exports = app;

// fetch('http://165.227.148.234:9000/leads/new-lead', {method : 'POST' })