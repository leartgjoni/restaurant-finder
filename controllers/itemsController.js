const Item = require('../models/item');
const Restaurant = require('../models/restaurant');
module.exports = {
    index(req, res, next){
        Restaurant.findById(req.session.passport.user)
            .populate('items')
            .then(restaurant => {
                res.render('items/index', {items: restaurant.items})
            })
            .catch(() => {})
    },
    edit(req, res, next){
        const messages = req.flash('error');
        const item = Item.findById(req.params.id)
            .then(item => {
                res.render('items/edit', {csrfToken: req.csrfToken(), messages: messages, hasErrors: messages.length > 0, item: item });
            })
            .catch(() => {});
    },
    create(req, res, next){
        var messages = req.flash('error');
        res.render('items/create', {csrfToken: req.csrfToken(), messages: messages, hasErrors: messages.length > 0 });
    },
    store(req, res, next){
        //validator
        req.checkBody('name', 'Name is required').notEmpty();
        req.checkBody('price', 'Price is required').notEmpty();

        var errors = req.validationErrors();
        if(errors){
            var messages = [];
            errors.forEach(function(error) {
                messages.push(error.msg);
            });
            req.flash('error', messages)
            return res.redirect('/items/create');
        }

        const newItem = new Item();
        newItem.name = req.body.name;
        newItem.price = req.body.price;
        if(req.body.description){
            newItem.description = req.body.description;
        }
        if(req.file){
            newItem.image = req.file.filename;
        }

        Restaurant.findById(req.session.passport.user)
            .then(user => {
                user.items.push(newItem);
                Promise.all([user.save(), newItem.save()])
                    .then(() => res.redirect('/items'));
            })
            .catch(() => {})

    },
    update(req, res, next){
        const item = Item.findById(req.params.id)
            .then(item => {
                //validator
                req.checkBody('name', 'Name is required').notEmpty();
                req.checkBody('price', 'Price is required').notEmpty();

                var errors = req.validationErrors();
                if(errors){
                    var messages = [];
                    errors.forEach(function(error) {
                        messages.push(error.msg);
                    });
                    req.flash('error', messages)
                    return res.redirect('/items/'+item._id);
                }

                item.name = req.body.name;
                item.price = req.body.price;
                if(req.body.description){
                    item.description = req.body.description;
                }
                if(req.file){
                    item.image = req.file.filename;
                }

                item.save()
                    .then(() => res.redirect('/items'))
                    .catch(() => {});
            })
            .catch(() => {});

    },
    delete(req, res, next){
        Item.findByIdAndRemove(req.params.id)
            .then(() => {
                res.redirect('/items');
            })
            .catch(() => {});
    }
};