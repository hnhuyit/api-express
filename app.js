var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose')
var dotenv = require('dotenv');

//Cau hinh bien moi truong
dotenv.config();

//Ket noi toi online monogodb
mongoose.connect(
  
  process.env.DB_CONNECT,
  { 
  	useUnifiedTopology: true, 
  	useNewUrlParser: true 
  },
  () => console.log('DB Connected')
);


var indexRouter = require('./routes/index');
var authRouter = require('./routes/auth');
var usersRouter = require('./routes/users');
var postsRouter = require('./routes/posts');
var tutorialsRouter = require('./routes/tutorials');
var productsRouter = require('./routes/products')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

//Auth
app.use('/api/auth', authRouter);

//User
app.use('/api/users', usersRouter);

//Post
app.use('/api/tutorials', tutorialsRouter);
app.use('/api/posts', postsRouter);

//Product
app.use('/api/products', productsRouter);



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
