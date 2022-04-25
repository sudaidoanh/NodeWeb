const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const users = new Schema({
    _id: {type: Number},
    username: { type: String },
    fullname: { type: String },
    email: { type: String },
    birthDay: { type: String },
    sex: { type: String },
    address: { type: String },
    slug: { type: String, slug: 'username', unique: true, },
}, {
    _id: false,
    timestamps: true,
});

mongoose.plugin(slug);

users.plugin(AutoIncrement, {collection_name: 'counterUsers'});
users.plugin(mongooseDelete, { 
    deletedAt: true,
    overrideMethods: 'all' });

module.exports = mongoose.model('Users', users);