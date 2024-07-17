const express =require('express');

const router = express.Router();
const Reserva = require('../models/Reserva')

//nodejs http get by date?
//GET ALL RESERVES
router.get('/all', async (req,res)=>{
    try{
        const reservas = await Reserva.find();
        res.json(reservas);
    }
    catch(err){
        res.json({message:err});
    }
});

router.get('/cantidades', async (req, res) => {
    const date = new Date(req.query.date);
    try {
        const cantidadesReservadas = await Reserva.aggregate([
            // Filtra las reservas por fecha
            { $match: { date: { $eq: date } } },
            // Desenreda el array de productos en las reservas
            { $unwind: '$products' },
            { $match: { 'products.isPlate': true } },
            // Agrupa por product_id y product_name y calcula la suma de quantity y total
            { $group: {
                    _id: { product_id: '$products.product_id', product_name: '$products.product_name' },
                    totalQuantity: { $sum: '$products.quantity' },
                    //totalSales: { $sum: '$products.total' }
                }},
            // Ordena los resultados por product_name
            { $sort: { '_id.product_name': 1 } }
        ]).exec();

        res.json(cantidadesReservadas);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

//Para cuando ambos sean undefined usar el get /
router.get('/zones', async function(req, res) {
    try{
        let lzone = req.query.zone;
        let ldate = req.query.date;
        let lwaiter = req.query.waiter;
        var reservas;
        //console.log(req.query.zone)
        if(lzone === undefined){
            reservas = await Reserva.find({date:ldate,waiterName:lwaiter})
            console.log(req.query.waiter)
        }
        else if(lwaiter === undefined){
            reservas = await Reserva.find({date:ldate,zone:lzone})
            console.log(req.query.zone)
        }
        else{
            reservas = await Reserva.find({zone:lzone,date:ldate,waiterName:lwaiter})
        }
        //const reserve = await Reserva.find(req.query.date);
        res.json(reservas);
    }
    catch(err){
        res.json({message:err});
    }
    //const date = new Date(req.query.date);
});
router.get('/filter', async function(req, res) {
    try{
        let search = req.query.search;
        let ldate = req.query.date;
        const reserves = await Reserva.find({clientName:{$regex: '(.*)' + search + '(.*)'},date:ldate});
        //console.log(reserves);
        //const reserve = await Reserva.find(req.query.date);
        res.json(reserves);
    }
    catch(err){
        res.json({message:err});
    }
    //const date = new Date(req.query.date);
});
router.get('/notPaid', async function(req, res) {
    try{
        let tdate = req.query.date;
        const reservas = await Reserva.find({date:tdate,isPaid:false})
        //const reserve =  Reserva.find(req.query.date);
        res.json(reservas);
    }
    catch(err){
        res.json({message:err});
    }
    //const date = new Date(req.query.date);
});
/*router.get('/zones/:zone/:date', async function(req, res) {
    try{
        const reservas = await Reserva.find({zone:req.params.zone, date:req.params.date})
        res.json(reservas);
    }
    catch(err){
        res.json({message:err});
    }
    //const date = new Date(req.query.date);
});*/

/*router.get('/zones', async function(req, res) {
    try{
        const reservas = await Reserva.find({zone:req.query.zone, date:req.query.date})
        res.json(reservas);
    }
    catch(err){
        res.json({message:err});
    }
});*/
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
    try{
        let tdate = req.query.date;
        const reservas = await Reserva.find({date:tdate})
        //const reserve = await Reserva.find(req.query.date);
        res.json(reservas);
    }
    catch(err){
        res.json({message:err});
    }
    //const date = new Date(req.query.date);
});


//DELETE
//nodejs pass date as query param?
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
        const updatedReserve = await Reserva.updateOne({_id: req.params.reserveId},{$set: {waiterName:req.body.waiterName}});
        res.json(updatedReserve);
    }
    catch(err){
        res.json({message:err});
    }
});

router.patch('/venta/:reserveId', async (req,res)=>{
    try{
        const updatedReserve = await Reserva.updateOne({_id: req.params.reserveId},{$set: {isPaid:true}});
        res.json(updatedReserve);
    }
    catch(err){
        res.json({message:err});
    }
});
// put in nodejs?
router.put("/:reserveId", async(req, res) => {
    try{
        const updatedReserve = await Reserva.updateOne({_id: req.params.reserveId},{$set: {
            date: req.body.date,
            zone: req.body.zone,
            clientName: req.body.clientName,
            num_people: req.body.num_people,
            total: req.body.total,
            products: req.body.products,
            waiterName: req.body.waiterName,
            notas:req.body.notas,
            isPaid: false
        }});
        res.json(updatedReserve);
    }
    catch(err){
        res.json({message:err});
    }
}) 


router.post('/',(req,res)=>{
    const reserve = new Reserva({
       // id: req.body.id,
        date: req.body.date,
        zone: req.body.zone,
        clientName: req.body.clientName,
        num_people: req.body.num_people,
        total: req.body.total,
        products: req.body.products,
        waiterName: req.body.waiterName,
        notas:req.body.notas,
        isPaid: false
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