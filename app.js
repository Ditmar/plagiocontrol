var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var mustacheExpress = require('mustache-express');
var logger = require('morgan');
var fileupload = require('express-fileupload');
var apiclient = require ('./routes/apiclient/index')
var serverRouter = require('./routes/server/index');
var usersRouter = require('./routes/server/users');

var app = express();


app.engine('html', mustacheExpress());
app.set('view engine', 'html');
app.set('views', __dirname + '/views');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', apiclient);
app.use("/server", serverRouter);
app.use('/users', usersRouter);

//Upload File
app.use(fileupload({
  limits: { fileSize: 12 * 1024 * 1024 },
}));

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
var port = 8000;
app.listen(port, () => {
  console.log("SOCKET ON " + port);
});
module.exports = app;
