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
router.get('/date', async function(req, res) {
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
router.get('/cantidades', async (req, res) => {
    const date = new Date(req.query.date);
    const startOfDay = new Date(date.setHours(0, 0, 0, 0));
    const endOfDay = new Date(date.setHours(23, 59, 59, 999));

    try {
        const cantidadesEntregadas = await Comanda.aggregate([
            { $match: { createdAt: { $gte: startOfDay, $lt: endOfDay } } },
            { $unwind: '$products' },
            { $match: { 'products.state': "Entregado" } },
            { $group: {
                    _id: { product_id: '$products.product_id', product_name: '$products.product_name' },
                    totalQuantity: { $sum: '$products.quantity' },
                }},
            { $sort: { '_id.product_name': 1 } }
        ]).exec();
        res.json(cantidadesEntregadas);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get('/reportes/tiempoPromedio', async (req, res) => {
    const startDate = new Date(req.query.start);
    const endDate = new Date(req.query.end);
    try {
        const result = await Comanda.aggregate([
            {
                $match: {
                    createdAt: { $gte: startDate, $lte: endDate }
                }
            },
            {
                $project: {
                    timeDiff: { $subtract: ["$updatedAt", "$createdAt"] }
                }
            },
            {
                $group: {
                    _id: null,
                    averageTimeDiff: { $avg: "$timeDiff" }
                }
            }
        ]).exec();

        const averageTimeInMs = result[0]?.averageTimeDiff || 0;
        const averageTimeInSeconds = averageTimeInMs / 1000;

        res.json({ averageTimeInSeconds });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
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
        const removedComanda = await Comanda.findByIdAndDelete(req.params.comandaId);
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