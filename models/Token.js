const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose);

const TokenSchema = mongoose.Schema({

    _id: {type: Number},
    token:{
        type: String
    },
},{ _id: false });

TokenSchema.plugin(AutoIncrement, {id: 'token_id_counter',inc_field: '_id'});
module.exports = mongoose.model('Token',TokenSchema)