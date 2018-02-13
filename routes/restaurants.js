const express = require('express');
const router = express.Router();
const restaurantController = require('../controllers/restaurantController');

/* GET home page. */
router.get('/', restaurantController.index);
router.post('/', restaurantController.search);
router.get('/:id', restaurantController.show);

module.exports = router;
