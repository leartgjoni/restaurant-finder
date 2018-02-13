const Restaurant = require('../models/restaurant');
const Item = require('../models/item');
const Cart = require('../models/cart');

module.exports = {
      search(req, res, next){
          //ToDo insert address into session.

          const address = req.body.address;
          const latitude = req.body.latitude;
          const longitude = req.body.longitude;
          req.session.address = {
              address, latitude, longitude
          };

          return res.redirect('/restaurants/');

      },

      index(req, res, next){
          if(!req.session.address){
              return res.redirect('/');
          }
          longitude = req.session.address.longitude;
          latitude = req.session.address.latitude;
          Restaurant.geoNear(
              { type: 'Point', coordinates: [parseFloat(longitude), parseFloat(latitude)] },
              { spherical: true, maxDistance: 1000 }
          )
              .then(restaurants => {
                  res.render('restaurant/index', {restaurants: restaurants});
              })
              .catch(next);
      },

      show(req, res, next){
          const restaurant = Restaurant.findById(req.params.id)
                                        .populate('items')
                                        .then(restaurant => {
                                            const cart = new Cart(req.session.cart ? req.session.cart : {});
                                            cartItems = cart.generateArray();
                                            res.render('restaurant/show', {restaurant: restaurant, cartItems: cartItems})
                                        })
                                        .catch(next);
      }


};