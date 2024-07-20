
const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose);

const ReservaSchema = mongoose.Schema({
    /*id:{
        type: Number,
    },*/
    _id: {type: Number},
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
},{ _id: false });

ReservaSchema.plugin(AutoIncrement, {id: 'reserves_id_counter',inc_field: '_id'});
module.exports = mongoose.model('Reserva',ReservaSchema)