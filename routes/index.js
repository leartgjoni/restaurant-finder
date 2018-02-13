const express = require('express');
const router = express.Router();
const csrf = require('csurf');
const csrfProtection = csrf();
const homeController = require('../controllers/homeController');

/* GET home page. */
router.get('/', csrfProtection, homeController.home);

module.exports = router;
