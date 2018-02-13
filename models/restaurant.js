const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');

const PointSchema = new Schema({
    type: { type: String, default: 'Point' },
    coordinates: {type: [Number], index: '2dsphere'}
});

const RestaurantSchema = new Schema({
    email: { type: String, required: true },
    password: { type: String, required: true},
    name: { type: String, required: true},
    address: { type: String, required: true},
    description: { type: String },
    items: [{ type: Schema.Types.ObjectId, ref:'item' }],
    image: { type: String },
    geometry: PointSchema
});

RestaurantSchema.methods.encryptPassword = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(5), null);
};

RestaurantSchema.methods.validPassword = function(candidatePassword) {
    return bcrypt.compareSync(candidatePassword, this.password);
};

const Restaurant = mongoose.model('restaurant', RestaurantSchema);

module.exports = Restaurant;