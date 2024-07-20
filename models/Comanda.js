
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

ComandaSchema.post('save', function(doc) {
    const timeZone = 'America/La_Paz';
    doc.createdAt = new Date(doc.createdAt).toLocaleString('en-US', { timeZone });
    doc.updatedAt = new Date(doc.updatedAt).toLocaleString('en-US', { timeZone });
});

module.exports = mongoose.model('Comanda',ComandaSchema)