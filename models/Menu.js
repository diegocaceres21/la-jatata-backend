
const mongoose = require('mongoose')

const MenuSchema = mongoose.Schema({

    date:{
        type: Date
    },
    products:[{
        product_id: String,
        product_name: String,
        prepared: Number,
        //reservated:Number,
        //delivered:Number
    }],
});

module.exports = mongoose.model('Menu',MenuSchema)