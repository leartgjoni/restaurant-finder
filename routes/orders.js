const express = require('express');
const router = express.Router();
const ordersController = require('../controllers/ordersController');
const authMiddlewares = require('../helpers/authMiddlewares');

//index
router.get('/', authMiddlewares.isLoggedIn, ordersController.index);
router.get('/store/:id', ordersController.store);
router.get('/:id', authMiddlewares.isLoggedIn, ordersController.done);

module.exports = router;