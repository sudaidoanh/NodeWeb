const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-generator');

const admin = new Schema({
    idAdmin: {type: Number},
    username: { type: String },
    fullname: { type: String } ,
    image: { type: String },
    password: { type: String },
    slug: { type: String, slug: 'username', unique: true, },
}, {
    timestamps: true,
});

mongoose.plugin(slug);

module.exports = mongoose.model('admins', admin);