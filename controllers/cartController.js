const Item = require('../models/item');
const Cart = require('../models/cart');

module.exports = {
    add(req, res, next){
        id = req.params.id;
        Item.findById(id)
            .then((item) => {
                var cart = new Cart(req.session.cart ? req.session.cart : {}); //because in session we can only save json and not object with function
                cart.add(item,id);
                req.session.cart = cart;
                res.redirect('back');
            })
            .catch(() => {});
    },

    reduceByOne(req, res, next){
        id = req.params.id;
        var cart = new Cart(req.session.cart ? req.session.cart : {});
        cart.reduceByOne(id);
        req.session.cart = cart;
        res.redirect('back');
    },

    removeItem(req, res, next){
        id = req.params.id;
        var cart = new Cart(req.session.cart ? req.session.cart : {});
        cart.removeItem(id);
        req.session.cart = cart;
        res.redirect('back');
    },

    checkOut(req, res, next){
        const cart = new Cart(req.session.cart);
        res.render('cart/check-out', {items: cart.generateArray(), totalPrice: cart.totalPrice, restaurant_id: req.params.id });
    }


};