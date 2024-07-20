
const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose);

const ComandaSchema = mongoose.Schema({

    _id: {type: Number},
    id_reserva:{
        type: String,
        required: true
    },
    //waiter_name:{type: String},
    products:[{
        product_id: Number,
        product_name: String,
        quantity:Number,
        state:String
    }],
    status:{type:String},
    notes: {type:String}
},
{timestamps: true},
{ _id: false });

ComandaSchema.plugin(AutoIncrement, {id: 'comanda_id_counter',inc_field: '_id'});

module.exports = mongoose.model('Comanda',ComandaSchema)