const express = require('express');
const router = express.Router();
const passport = require('passport');
const csrf = require('csurf');
const multer = require('multer');
const upload = multer({dest:'./public/images/uploads'});
const authController = require('../controllers/authController');
const authMiddlewares = require('../helpers/authMiddlewares');

const csrfProtection = csrf();

router.get('/login', [authMiddlewares.notLoggedIn, csrfProtection], authController.getLogin);

router.post('/login', passport.authenticate('local.signin', {
    failureRedirect: '/auth/login',
    failureFlash: true
}), authController.login);

router.get('/register', [authMiddlewares.notLoggedIn, csrfProtection], authController.getRegister);

router.post('/register', [upload.single('image'), passport.authenticate('local.signup', {
    failureRedirect: '/auth/register',
    failureFlash: true
})], authController.register);

router.get('/logout', authMiddlewares.isLoggedIn, authController.logout);

module.exports = router;
