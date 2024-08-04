const mongoose = require('mongoose')

const ProductSchema = mongoose.Schema({

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
});

module.exports = mongoose.model('Products',ProductSchema)
