
const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose);

const MeseroSchema = mongoose.Schema({

    _id: {type: Number},
    waiterName:{type: String},
},
{ _id: false });

MeseroSchema.plugin(AutoIncrement, {id: 'waiter_id_counter',inc_field: '_id'});
module.exports = mongoose.model('Mesero',MeseroSchema)