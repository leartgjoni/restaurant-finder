const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ItemSchema = Schema({
    name: { type: String, required: true },
    description: { type: String },
    image: { type: String },
    price: { type: Number, required: true }
});

const Item = mongoose.model('item', ItemSchema);

module.exports = Item;