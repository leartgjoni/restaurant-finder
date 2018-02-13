const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderSchema = Schema({
    restaurant: { type: Schema.Types.ObjectId, ref: 'restaurant'},
    address: { type: String, required: true },
    cel: { type: String, required: true },
    cart: { type: Object, required: true },
    done: { type: Boolean, default: 0 }
});

const Order = mongoose.model('order', OrderSchema);

module.exports = Order;