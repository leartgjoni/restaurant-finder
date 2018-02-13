const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

/* GET home page. */
router.get('/add/:id', cartController.add);
router.get('/reduce/:id', cartController.reduceByOne);
router.get('/remove-item/:id', cartController.removeItem);
router.get('/check-out/:id', cartController.checkOut);
module.exports = router;
