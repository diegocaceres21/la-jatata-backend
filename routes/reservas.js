const express =require('express');

const router = express.Router();
const Reserva = require('../models/Reserva')

//nodejs http get by date?
//GET ALL RESERVES
router.get('/', async (req,res)=>{
    try{
        const reservas = await Reserva.find();
        res.json(reservas);
    }
    catch(err){
        res.json({message:err});
    }
});

//GET PRODUCT BY ID
router.get('/:reserveId', async (req,res)=>{
    try{
        const reserve = await Reserva.findById(req.params.reserveId);
        res.json(reserve);
    }
    catch(err){
        res.json({message:err});
    }
});

router.get('/', async function(req, res) {
    const date = new Date(req.query.date);
});
//DELETE
router.delete('/:reserveId', async (req,res)=>{
    try{
        const removedReserve = await Reserva.remove({_id: req.params.reserveId});
        res.json(removedReserve);
    }
    catch(err){
        res.json({message:err});
    }
});

//ACOMODAR
router.patch('/:reserveId', async (req,res)=>{
    try{
        const updatedReserve = await Reserva.updateOne({_id: req.params.reserveId},{$set: {products:req.body.products}});
        res.json(updatedReserve);
    }
    catch(err){
        res.json({message:err});
    }
});

router.post('/',(req,res)=>{
    const reserve = new Reserva({
       // id: req.body.id,
        date: req.body.date,
        zone: req.body.zone,
        clientName: req.body.clientName,
        num_people: req.body.num_people,
        total: req.body.total,
        products: req.body.products,
        waiterId: req.body.waiterId
    });
    reserve.save()
    .then(data=>{
        res.json(data);
    })
    .catch(err=>{
        res.json({message: err});
    })
});
module.exports = router;