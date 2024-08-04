const mongoose = require('mongoose')

const TokenSchema = mongoose.Schema({

    token:{
        type: String
    },
});

module.exports = mongoose.model('Token',TokenSchema)