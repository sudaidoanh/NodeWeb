const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const productSchema = new Schema({
    id: { type: String },
    name: { type: String },
    company: { type: String },
    description: { type: String } ,
    image: { type: String },
    image2: { type: String },
    image3: { type: String },
    image4: { type: String },
    image5: { type: String },
    catelogy: { type: String ,
        enum: [
            'Gaming',
            'Học tập, văn phòng',
            'Đồ họa, kĩ thuật',
            'Mỏng nhẹ',
            'Cao cấp',
            'Macbook'] ,
        } ,
    slug: { type: String, slug: 'name', unique: true, },
    promotion: { type: String },
    discount: { type: Number },
    price: { type: Number },
    inventory: { type: Number },
    CPU: { type: String },
    RAM: { type: String },
    storage: { type: String },
    screen: { type: String },
    graphicCard: { type: String },
    communicationPort: { type: String },
    WIFI: { type: String },
    bluetooth: { type: String },
    webcam: { type: String },
    OS: { type: String },
    batterry: { type: String },
    weight: { type: String },
    color: { type: String },
    witdh: { type: String },
    
}, {
    timestamps: true,
});

mongoose.plugin(slug);

productSchema.plugin(AutoIncrement, {
    inc_field: 'idProduct',
    collection_name: 'counterProducts'});
productSchema.plugin(mongooseDelete, { 
    deletedAt: true,
    overrideMethods: 'all' });

module.exports = mongoose.model('products', productSchema);