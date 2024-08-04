
const mongoose = require('mongoose')

const MeseroSchema = mongoose.Schema({

    waiterName:{type: String},
});

module.exports = mongoose.model('Mesero',MeseroSchema)