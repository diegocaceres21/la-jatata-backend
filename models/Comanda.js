
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

ComandaSchema.methods.toJSON = function() {
    const obj = this.toObject();
    const timeZone = 'America/La_Paz';

    obj.createdAt = new Date(obj.createdAt).toLocaleString('en-US', { timeZone });
    obj.updatedAt = new Date(obj.updatedAt).toLocaleString('en-US', { timeZone });

    return obj;
};

module.exports = mongoose.model('Comanda',ComandaSchema)