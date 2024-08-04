
const mongoose = require('mongoose')

const ReservaSchema = mongoose.Schema({
    date:{
        type: Date
    },
    zone:{
        type: String
        //required: true
    },
    clientName:{
        type: String,
        required: true
    },
    num_people:{
        type: Number
        //required: true
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
    notas:{
        type:String
    },
    waiterName:{
        type: String
    },
    isPaid:{
        type: Boolean,
        required:true
    }
});

module.exports = mongoose.model('Reserva',ReservaSchema)