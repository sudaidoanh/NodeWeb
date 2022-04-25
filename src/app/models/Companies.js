const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const companySchema = new Schema({
    name: { type: String },
    image: { type: String },
    slug: { type: String, slug: 'name', unique: true, },
}, {
    timestamps: true,
  
});

mongoose.plugin(slug);

companySchema.plugin(AutoIncrement, { 
    inc_field: 'id',
    collection_name: 'counterCompanies',
    });
companySchema.plugin(mongooseDelete, { 
    deletedAt: true,
    overrideMethods: 'all' });

module.exports = mongoose.model('companies', companySchema);
