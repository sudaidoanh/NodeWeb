const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongooseDelete = require('mongoose-delete');

const cart = new Schema({
    userID: { type: Schema.Types.ObjectId },
    total: { type: Number } ,
    deliveryAddress: { type: String } ,
    products: {type: Map, of: Number } ,
}, {
    timestamps: true,
});

cart.plugin(mongooseDelete, { 
    deletedAt: true,
    overrideMethods: 'all' });

module.exports = mongoose.model('Carts', cart);