const Order = require('../models/order');
const Cart = require('../models/cart');

module.exports = {
    done(req, res, next){
        const id = req.params.id;
        Order.findByIdAndUpdate({_id: id}, {done: 1}, () => res.redirect('/orders'));
    },
    store(req, res, next){
        const order = new Order();
        order.restaurant = req.params.id;
        order.address = req.session.address.address;
        order.cel = "+0000";
        order.cart = req.session.cart;

        order.save()
            .then( () => {
                req.session.cart = {};
                res.render('orders/success');
            })
            .catch(() => {});

    },
    index(req, res, next){
        Order.find({restaurant: req.session.passport.user})
            .then(orders => {
                for(var i=0; i<orders.length; i++){
                    const cart = new Cart(orders[i].cart);
                    orders[i].cart.itemsGroup = cart.generateArray();
                    console.log(orders[i].cart.itemsGroup);
                }
                //console.log(orders);
                res.render('orders/index', {orders: orders});
            })
            .catch(() => {});
    }

};