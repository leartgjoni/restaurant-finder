const Restaurant = require('../models/restaurant');

module.exports = {
    home(req, res, next){
        Restaurant.find({})
            .limit(3)
            .then((restaurants) => {
                res.render('home', {restaurants: restaurants, csrfToken: req.csrfToken()});
            });
    }
};