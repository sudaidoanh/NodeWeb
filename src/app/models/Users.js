const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongooseDelete = require('mongoose-delete');

const users = new Schema({
    username: { type: String , unique: true, required: true},
    fullname: { type: String },
    password: { type: String },
    role: { type: String, enum: ['admin', 'user'], required: true},
}, {
    timestamps: true,
});

users.plugin(mongooseDelete, { 
    deletedAt: true,
    overrideMethods: 'all' });

module.exports = mongoose.model('Users', users);