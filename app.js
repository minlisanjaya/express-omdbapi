const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

require('express-async-errors');

const indexRouter = require('./routes/index');
const movieRouter = require('./routes/movie');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter, movieRouter);

// catch 404 and return not found
app.use(function (req, res, next) {
  res.status(404).send({ message: 'Not Found' });
});

// error handler
app.use(function (err, req, res, _next) {
  const errorMessage = {
    message: req.app.get('env') === 'development' ? err.message : 'Error!!',
  };

  res.status(err.status || 500).send(errorMessage);
});

module.exports = app;
