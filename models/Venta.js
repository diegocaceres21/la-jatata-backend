
const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose);

const VentaSchema = mongoose.Schema({

    _id: {type: Number},
    date:{
        type: Date
    },
    clientName:{
        type: String,
        required: true
    },
    paymentMethod:{
        type: String,
        required: true
    },
    total:{ //OPCIONAL
        type: Number
    },
    products:[{
        product_id: Number,
        product_name: String,
        price: Number,
        quantity:Number,
        total:Number,
        isPlate:Boolean
    }],
},{ _id: false });
//mAYBE
VentaSchema.plugin(AutoIncrement, {id: 'ventas_id_counter',inc_field: '_id'});
module.exports = mongoose.model('Venta',VentaSchema)