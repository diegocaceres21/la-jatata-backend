const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose);

const ProductSchema = mongoose.Schema({
    /*id:{
        type: Number,
    },*/
    _id: {type: Number},
    name:{
        type: String,
        required: true
    },
    category:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    day:{
        type: String,
        required: true
    }
},{ _id: false });

ProductSchema.plugin(AutoIncrement, {id: 'products_id_counter',inc_field: '_id'});
module.exports = mongoose.model('Products',ProductSchema)
