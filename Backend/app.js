var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var cors = require('cors'); //CORS
var WhiteList = (process.env.CORS_ORIGIN || 'http://localhost:3001').split(',');

//APLICAR LOS CORS
var corsOptions = {
    origin: (origin, callback) =>{
        if (WhiteList.indexOf(origin) >=0) {
            callback(null, true);
        } else {
            callback(new Error('CORS not allowed ERROR'));
        }
    }
}
//_________________________________________________________

var indexRouter = require('./routes/index');
var apiRoutes = require('./routes/api/api');

var app = express();

app.use(logger('dev'));
app.use(cors(corsOptions)); // SE AGREGAR EL CORS
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//app.use('/', indexRouter);
app.use('/api', apiRoutes);
//app.use('/users', usersRouter);

module.exports = app;
