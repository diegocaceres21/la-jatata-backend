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
router.get('/date', async function(req, res) {
    try{
        let date = req.query.date;
        let startDate = new Date(date);
        startDate.setHours(0, 0, 0, 0)
        let endDate = new Date(date);
        endDate.setHours(23, 59, 59, 59)
        const comandas = await Comanda.find({createdAt:{$gte:startDate, $lt:endDate}/*,status:"Pendiente"*/})
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
router.patch('/:comandaId', async (req,res)=>{
    try{
        const updatedComanda = await Comanda.updateOne({_id: req.params.comandaId},{$set: {products:req.body.products}});
        res.json(updatedComanda);
    }
    catch(err){
        res.json({message:err});
    }
});

router.patch('/completed/:comandaId', async (req,res)=>{
    try{
        const updatedComanda = await Comanda.updateOne({_id: req.params._id},{$set: {status:req.body.status}});
        res.json(updatedComanda);
    }
    catch(err){
        res.json({message:err});
    }
});
 
router.post('/',(req,res)=>{
    const comanda = new Comanda({
       // id: req.body.id,
        id_reserva: req.body.id_reserva,
        products: req.body.products,
        status: "Pendiente",
        notes:req.body.notes
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