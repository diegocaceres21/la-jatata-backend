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
        res.status(500).json({error:err});
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
        res.status(500).json({error:err});
    }
    //const date = new Date(req.query.date);
});
/*router.get('/date', async function(req, res) {
    try{
        let date = req.query.date;
        let startDate = new Date(date);
        startDate.setHours(0, 0, 0, 0)
        let endDate = new Date(date);
        endDate.setHours(23, 59, 59, 59)
        const comandas = await Comanda.find({createdAt:{$gte:startDate, $lt:endDate},status:"Pendiente"})
        res.json(comandas);
    }
    catch(err){
        res.status(500).json({error:err});
    }
});*/
router.get('/date', async function(req, res) {
    try {
        let date = req.query.date;

        // Convert the provided date to the desired time zone
        let startDate = moment.tz(date, "America/La_Paz").startOf('day').toDate();
        let endDate = moment.tz(date, "America/La_Paz").endOf('day').toDate();

        // Query the database for documents within the whole day of the given date
        const comandas = await Comanda.find({
            createdAt: { $gte: startDate, $lt: endDate },
            status: "Pendiente"
        });

        res.json(comandas);
    } catch (err) {
        res.status(500).json({ error: err });
    }
});
router.get('/menu', async function(req, res) {
    try{
        let date = req.query.date;
        let startDate = new Date(date);
        startDate.setHours(0, 0, 0, 0)
        let endDate = new Date(date);
        endDate.setHours(23, 59, 59, 59)
        const comandas = await Comanda.find({createdAt:{$gte:startDate, $lt:endDate}})
        //const reserve = await Reserva.find(req.query.date);
        res.json(comandas); 
    }
    catch(err){
        res.status(500).json({error:err});
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
        res.status(500).json({error:err});
    }
});

//DELETE
router.delete('/:comandaId', async (req,res)=>{
    try{
        const removedComanda = await Comanda.remove({_id: req.params.comandaId});
        res.json(removedComanda);
    }
    catch(err){
        res.status(500).json({error:err});
    }
});

//ACOMODAR
router.patch('/:comandaId', async (req,res)=>{
    try{
        const updatedComanda = await Comanda.updateOne({_id: req.params.comandaId},{$set: {products:req.body.products}});
        res.json(updatedComanda);
    }
    catch(err){
        res.status(500).json({error:err});
    }
});

router.patch('/completed/:comandaId', async (req,res)=>{
    try{
        const updatedComanda = await Comanda.updateOne({_id: req.params.comandaId},{$set: {status:req.body.status}});
        res.json(updatedComanda);
    }
    catch(err){
        res.status(500).json({error:err});
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
        res.status(500).json({error: err});
    })
});
module.exports = router;