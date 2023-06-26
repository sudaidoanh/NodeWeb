const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const order = new Schema({
    _id: { type: Number},
    idUser: { type: Number },
    total: { type: Number } ,
    deliveryAddress: { type: String } ,
    status: { type: String },
    slug: { type: String, slug: 'idUser', unique: true, },
}, {
    _id: false,
    timestamps: true,
});

mongoose.plugin(slug);

order.plugin(AutoIncrement, {collection_name: 'counterOrders'});
order.plugin(mongooseDelete, { 
    deletedAt: true,
    overrideMethods: 'all' });

module.exports = mongoose.model('Orders', order);