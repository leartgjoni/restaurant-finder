module.exports = {
    isLoggedIn(req, res, next){
        if(req.isAuthenticated()){
            return next();
        }
        res.redirect('/');
    },

    notLoggedIn(req, res, next) {
        if(!req.isAuthenticated()){
            return next();
        }
        res.redirect('/');
    }
};