
const mongoose = require('mongoose')

const ComandaSchema = mongoose.Schema({

    id_reserva:{
        type: String,
        required: true
    },
    products:[{
        product_id: { type: mongoose.Schema.Types.ObjectId },
        product_name: String,
        quantity:Number,
        state:String
    }],
    status:{type:String},
    notes: {type:String}
},
{timestamps: true});
//TODO: ACOMODAR LA HORA QUE SE COLOCA COMO SI FUERA OTRO MERIDIANO

module.exports = mongoose.model('Comanda',ComandaSchema)