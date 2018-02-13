module.exports = {
    getLogin(req, res, next){
        var messages = req.flash('error');
        res.render('auth/login', {csrfToken: req.csrfToken(), messages: messages, hasErrors: messages.length > 0 })
    },
    login(req, res, next){
        if(req.session.oldUrl) {
            var oldUrl = req.session.oldUrl;
            req.session.oldUrl = null;
            res.redirect(oldUrl);
        } else {
            res.redirect('/'); //ToDo for now
        }
    },
    getRegister(req, res, next){
        var messages = req.flash('error');
        res.render('auth/register', {csrfToken: req.csrfToken(), messages: messages, hasErrors: messages.length > 0 })
    },
    register(req, res, next){
        if(req.session.oldUrl) {
            var oldUrl = req.session.oldUrl;
            req.session.oldUrl = null;
            res.redirect(oldUrl);
        } else {
            res.redirect('/');
        }
    },
    logout(req, res, next){
        req.logout();
        res.redirect('/');
    }
};