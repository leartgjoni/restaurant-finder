const express = require('express');
const router = express.Router();
const csrf = require('csurf');
const multer = require('multer');
const upload = multer({dest:'./public/images/uploads'});
const itemsController = require('../controllers/itemsController');
const authMiddlewares = require('../helpers/authMiddlewares');
const csrfProtection = csrf();

router.use(authMiddlewares.isLoggedIn);

//index
router.get('/', itemsController.index);
router.get('/create', csrfProtection, itemsController.create);
router.post('/', upload.single('image'), itemsController.store);
router.get('/:id', csrfProtection, itemsController.edit);
router.post('/update/:id', upload.single('image'), itemsController.update);
router.get('/delete/:id', itemsController.delete);

module.exports = router;