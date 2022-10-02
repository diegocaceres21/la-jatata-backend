const express =require('express');

const router = express.Router();
const Comanda = require('../models/Comanda')


//GET ALL RESERVES
router.get('/all', async (req,res)=>{
    try{
        const comandas = await Comanda.find();
        res.json(comandas);
    }
    catch(err){
        res.json({message:err});
    }
});

router.get('/', async function(req, res) {
    try{
        let reserva = req.query.id_reserva;
        const comandas = await Comanda.find({id_reserva:reserva})
        //const reserve = await Reserva.find(req.query.date);
        res.json(comandas);
    }
    catch(err){
        res.json({message:err});
    }
    //const date = new Date(req.query.date);
});
//GET PRODUCT BY ID
router.get('/:comandaId', async (req,res)=>{
    try{
        const comanda = await Comanda.findById(req.params.comandaId);
        res.json(comanda);
    }
    catch(err){
        res.json({message:err});
    }
});

//DELETE
router.delete('/:comandaId', async (req,res)=>{
    try{
        const removedComanda = await Comanda.remove({_id: req.params.comandaId});
        res.json(removedComanda);
    }
    catch(err){
        res.json({message:err});
    }
});

//ACOMODAR
router.patch('/:productId', async (req,res)=>{
    try{
        const updatedProduct = await Product.updateOne({_id: req.params.productId},{$set: {price:req.body.price}});
        res.json(updatedProduct);
    }
    catch(err){
        res.json({message:err});
    }
});
 
router.post('/',(req,res)=>{
    const comanda = new Comanda({
       // id: req.body.id,
        id_reserva: req.body.id_reserva,
        products: req.body.products
    });
    comanda.save()
    .then(data=>{
        res.json(data);
    })
    .catch(err=>{
        res.json({message: err});
    })
});
module.exports = router;