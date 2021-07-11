const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
require('./utils/import/importUsers-1');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const marketingRouter = require('./routes/marketing');
const leadsRouter = require('./routes/leads');
const salesRouter = require('./routes/sales');
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
app.use('/sales' , salesRouter)

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

// fetch('http://165.227.148.234:9000/leads/new-lead', {method : 'POST' })