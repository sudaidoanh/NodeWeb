const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const peopleSchema = new Schema({
    _id: { type: Number },
    name: { type: String },
    description: { type: String } ,
    image: { type: String },
    slug: { type: String, slug: 'name', unique: true, },
}, {
    _id: false,
    timestamps: true,
});

mongoose.plugin(slug);

peopleSchema.plugin(AutoIncrement)
peopleSchema.plugin(mongooseDelete, { 
    deletedAt: true,
    overrideMethods: 'all' });

module.exports = mongoose.model('Tests', peopleSchema);