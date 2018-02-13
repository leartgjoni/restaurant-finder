const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const expressHbs = require('express-handlebars');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const flash = require('connect-flash');
const validator = require('express-validator');
const hbsHelper = require('../helpers/hbsHelper');

module.exports = function(app){

    //assign mongoose promise to global promise
    mongoose.Promise = global.Promise;
    mongoose.connect('mongodb://localhost/restaurant-finder');

    //call passport config
    require('./passport');

    //view engine setup
    app.engine('.hbs', expressHbs({defaultLayout: 'layout', extname: '.hbs', helpers: hbsHelper}));
    app.set('view engine', '.hbs');

    //middleware config
    //logger
    app.use(logger('dev'));
    //parse http post body
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    //use express validator
    app.use(validator());
    app.use(cookieParser());
    //conf session
    app.use(session({
        secret: 'mysupersecret',
        resave: false,
        saveUninitialized: false
    }));
    //use connect flash for flash messages
    app.use(flash());
    //initialize passport and passport session
    app.use(passport.initialize());
    app.use(passport.session());
    //conf static files
    app.use(express.static(path.join(__dirname, '../public')));

    //set global variable
    app.use(function(req, res, next){
        res.locals.login = req.isAuthenticated();
        res.locals.session = req.session;
        res.locals.user = req.session.passport ? req.session.passport.user : null;
        next();
    });

};
