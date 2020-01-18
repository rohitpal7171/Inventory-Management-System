var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors=require('cors')


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var trainerRouter = require('./routes/trainer');
var productRouter = require('./routes/product');
var adminRouter = require('./routes/admin');
var schoolRouter = require('./routes/school');
var schoolModuleRouter = require('./routes/schoolModule');
var userRouter = require('./routes/user');
var fileUploadRouter = require('./routes/fileUpload');
var contactRouter = require('./routes/contact');
var damageFileUploadRouter = require('./routes/damageFileUpload');
var app = express();

// view engine setup
app.set('build', path.join(__dirname, 'build','index.html'));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'build')));
app.use(cors());

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/trainer',trainerRouter);
app.use('/product',productRouter);
app.use('/admin',adminRouter);
app.use('/school',schoolRouter);
app.use('/schoolModule',schoolModuleRouter);
app.use('/user', userRouter);
app.use('/fileUpload', fileUploadRouter);
app.use('/contact', contactRouter);
app.use('/damageFileUpload',damageFileUploadRouter);


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
