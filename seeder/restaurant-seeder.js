var Restaurant = require('../models/restaurant');
var bcrypt = require('bcrypt-nodejs');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/restaurant-finder');
mongoose.Promise = global.Promise;


var restaurants = [
    new Restaurant({
        email: 'test@test.com',
        address: 'Rruga Fortuzi, Tirane',
        geometry: {type: 'Point', coordinates: [ 19.8134209, 41.3324305]},
        image: "https://s-ec.bstatic.com/images/hotel/max1024x768/699/69918405.jpg",
        description: "some dummy text like lorem ipsum is",
        name: "Senator Hotel",
        password: bcrypt.hashSync('password', bcrypt.genSaltSync(5), null)
    }),
    new Restaurant({
        email: 'test1@test.com',
        address: 'Sheshi Italia, Tirane',
        geometry: {type: 'Point', coordinates: [ 19.8203107, 41.3182366]},
        image: "https://q.bstatic.com/images/hotel/max1024x768/419/41971621.jpg",
        description: "some dummy text like lorem ipsum is",
        name: "Sheraton Hotel",
        password: bcrypt.hashSync('password', bcrypt.genSaltSync(5), null)
    }),
    new Restaurant({
        email: 'test2@test.com',
        address: 'Sheshi Skenderbej Nr.8, Tiranë',
        geometry: {type: 'Point', coordinates: [19.816409, 41.32977]},
        image: "https://media-cdn.tripadvisor.com/media/photo-p/0a/15/5f/a3/tirana-international.jpg",
        description: "some dummy text like lorem ipsum is",
        name: "Tirana International Hotel",
        password: bcrypt.hashSync('password', bcrypt.genSaltSync(5), null)
    }),
    new Restaurant({
        email: 'test3@test.com',
        address: 'Galeria (ish-Kinema 17 Nëntori) , Rruga e Barrikadave, Tirana',
        geometry: {type: 'Point', coordinates: [19.8174544, 41.3310167]},
        image: "https://media-cdn.tripadvisor.com/media/photo-s/08/59/43/b7/piceri-golosa.jpg",
        description: "some dummy text like lorem ipsum is",
        name: "Pizzeria Golosa",
        password: bcrypt.hashSync('password', bcrypt.genSaltSync(5), null)
    }),
];

var done = 0;
for( var i = 0; i < restaurants.length; i++){
    restaurants[i].save(function(err, result){
        done++;
        if(done === restaurants.length){
            exit();
        }
    });
}

function exit(){
    mongoose.disconnect();
}