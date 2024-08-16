
const mongoose = require('mongoose')

const VentaSchema = mongoose.Schema({

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
        product_id: String,
        product_name: String,
        price: Number,
        quantity:Number,
        total:Number,
        isPlate:Boolean
    }],
});

module.exports = mongoose.model('Venta',VentaSchema)