const express = require('express');
const appConfig = require('./config/appConfig');
const appErrorHandler = require('./config/appErrorHandler');
//routes import
const index = require('./routes/index');
const restaurants = require('./routes/restaurants');
const cart = require('./routes/cart');
const auth = require('./routes/auth');
const items = require('./routes/items');
const orders = require('./routes/orders');

const app = express();

appConfig(app);

//routes setup
app.use('/', index);
app.use('/restaurants', restaurants);
app.use('/cart', cart);
app.use('/auth', auth);
app.use('/items', items);
app.use('/orders', orders);

appErrorHandler(app);


module.exports = app;
