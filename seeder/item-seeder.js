var Item = require('../models/item');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/restaurant-finder');
mongoose.Promise = global.Promise;


var items = [
    new Item({
        name: 'margherita',
        description: 'pizza buona buona',
        image: 'https://upload.wikimedia.org/wikipedia/commons/a/a3/Eq_it-na_pizza-margherita_sep2005_sml.jpg',
        price: 12
    }),
    new Item({
        name: 'capricciosa',
        description: 'pizza buona 2',
        image: 'https://upload.wikimedia.org/wikipedia/commons/a/a3/Eq_it-na_pizza-margherita_sep2005_sml.jpg',
        price: 12
    }),
    new Item({
        name: 'lunatica',
        description: 'pizza non molto buona',
        image: 'https://upload.wikimedia.org/wikipedia/commons/a/a3/Eq_it-na_pizza-margherita_sep2005_sml.jpg',
        price: 12
    }),
];

var done = 0;
for( var i = 0; i < items.length; i++){
    items[i].save(function(err, result){
        done++;
        if(done === items.length){
            exit();
        }
    });
}

function exit(){
    mongoose.disconnect();
}