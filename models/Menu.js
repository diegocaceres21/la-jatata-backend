
const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose);

const MenuSchema = mongoose.Schema({

    _id: {type: Number},
    date:{
        type: Date
    },
    products:[{
        product_id: Number,
        product_name: String,
        prepared:Number,
        reservated:Number
    }],
},{ _id: false });

MenuSchema.plugin(AutoIncrement, {id: 'menu_id_counter',inc_field: '_id'});
module.exports = mongoose.model('Menu',MenuSchema)