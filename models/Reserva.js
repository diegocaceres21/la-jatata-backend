
const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose);

class OrderItem {
    constructor(product_id,product_name,price, quantity) {
      this.product_id = product_id;
      this.product_name = product_name;
      this.quantity = quantity;
      this.price = price;
      this.total = this.quantity * this.price;
    }
  }

const ReservaSchema = mongoose.Schema({
    /*id:{
        type: Number,
    },*/
    _id: {type: Number},
    date:{
        type: Date
    },
    zone:{
        type: String,
        required: true
    },
    clientName:{
        type: String,
        required: true
    },
    num_people:{
        type: Number,
        required: true
    },
    /*total:{ //OPCIONAL
        type: Number,
        required: true
    },*/
    products:[{
        product_id: Number,
        product_name: String,
        price: Number,
        quantity:Number,
        total:Number
    }],
    notas:{
        type:String
    },
    waiterName:{
        type: String
    },
},{ _id: false });

ReservaSchema.plugin(AutoIncrement, {id: 'reserves_id_counter',inc_field: '_id'});
module.exports = mongoose.model('Reserva',ReservaSchema)