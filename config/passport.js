var passport = require('passport');
var Restaurant = require('../models/restaurant');
var LocalStrategy = require('passport-local').Strategy;

// tell passport how to store user in session
passport.serializeUser(function(user, done){
    done(null, user.id); //serialize user by id
});

// tell passport how to take the user from the session
passport.deserializeUser(function(id, done){
    Restaurant.findById(id, function(err, user){
        done(err, user);
    })
});
// how will the user signup
passport.use('local.signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, function(req, email, password, done){
    //validator
    req.checkBody('email', 'Invalid Email').notEmpty().isEmail();
    req.checkBody('password', 'Invalid password').notEmpty().isLength({min: 4});
    req.checkBody('name', 'Name is required').notEmpty();
    req.checkBody('address', 'Address is required').notEmpty();
    req.checkBody('latitude', 'Latitude is required').notEmpty();
    req.checkBody('longitude', 'Longitude is required').notEmpty();
    var errors = req.validationErrors();
    if(errors){
        var messages = [];
        errors.forEach(function(error) {
            messages.push(error.msg);
        });
        return done(null, false, req.flash('error', messages));
    }

    Restaurant.findOne({ email: email }, function(err, user){
        if(err){
            return done(err);
        }
        if(user){
            return done(null, false, {message: 'Email is already in use'});
        }
        var newRestaurant = new Restaurant();
        newRestaurant.email = email;
        newRestaurant.password = newRestaurant.encryptPassword(password);
        newRestaurant.name = req.body.name;
        newRestaurant.address = req.body.address;
        newRestaurant.geometry = { type: 'Point', coordinates: [req.body.longitude, req.body.latitude]};
        newRestaurant.image = (req.file) ? req.file.filename : '';

        newRestaurant.save(function(err, result){
            if(err){
                return done(err);
            }
            return done(null, newRestaurant);
        });
    });
}));

passport.use('local.signin', new LocalStrategy({
    usernameField: 'email',
    papsswordField: 'password',
    passReqToCallback: true
}, function(req, email, password, done){
    //validator
    req.checkBody('email', 'Invalid email').notEmpty().isEmail();
    req.checkBody('password', 'Invalid password').notEmpty();
    var errors = req.validationErrors();
    if(errors){
        var messages = [];
        errors.forEach(function(error) {
            messages.push(error.msg);
        });
        return done(null, false, req.flash('error', messages));
    }

    Restaurant.findOne({ email: email }, function(err, user){
        if(err){
            return done(err);
        }
        if(!user){
            return done(null, false, {message: 'No user found.'});
        }
        if(!user.validPassword(password)){
            return done(null, false, {message: 'Wrong password.'});
        }

        return done(null, user);

    });
}));
