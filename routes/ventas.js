const express =require('express');

const router = express.Router();
const Venta = require('../models/Venta')

//nodejs http get by date?
//GET ALL RESERVES
router.get('/range', async (req,res)=>{
    const startDate = req.query.start;
    const endDate = req.query.end;
    try{
        const filteredData =  await Venta.find({ date: { $gte: startDate, $lte: endDate }});
        res.json(filteredData);
    }
    catch(err){
        res.status(500).json({error:err});
    }
});

router.get('/report', async (req,res)=>{
    const startDate = new Date(req.query.start);
    console.log(startDate)
    const endDate = new Date(req.query.end);
    console.log(endDate)
    try{
        const sales = await Venta.aggregate([
            { $match: { date: { $gte: startDate, $lte: endDate } } },
            //{ $match: { _id: 10} },
            { $unwind: '$products' },
            //{ $lookup: { from: 'products', localField: 'products.product', foreignField: '_id', as: 'product' } },
            { $group: {
              _id: {product_name: '$products.product_name',isPlate:'$products.isPlate'},
              totalQuantity: { $sum: '$products.quantity'},
              totalSales: { $sum: '$products.total'}
            }},
            {$sort: {
                _id: 1
            }}
          ]).exec();

      res.json(sales);
    }
    catch(err){
        res.status(500).json({error:err});
    }
});

router.get('/all', async (req,res)=>{
    try{
        const ventas = await Venta.find();
        res.json(ventas);
    }
    catch(err){
        res.status(500).json({error:err});
    }
});

//Para cuando ambos sean undefined usar el get /
/*router.get('/zones', async function(req, res) {
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
        res.status(500).json({error:err});
    }
    //const date = new Date(req.query.date);
});*/


//GET PRODUCT BY ID
router.get('/:ventaId', async (req,res)=>{
    try{
        const venta = await Venta.findById(req.params.ventaId);
        res.json(venta);
    }
    catch(err){
        res.status(500).json({error:err});
    }
});




router.get('/', async function(req, res) {
    try{
        let tdate = req.query.date;
        const ventas = await Venta.find({date:tdate})
        //const reserve = await Reserva.find(req.query.date);
        res.json(ventas);
    }
    catch(err){
        res.status(500).json({error:err});
    }
    //const date = new Date(req.query.date);
});


//DELETE
//nodejs pass date as query param?
router.delete('/:ventaId', async (req,res)=>{
    try{
        const removedVenta = await Venta.findByIdAndDelete(req.params.ventaId);
        res.json(removedVenta);
    }
    catch(err){
        res.status(500).json({error:err});
    }
});

//ACOMODAR
router.patch('/:ventaId', async (req,res)=>{
    try{
        const updatedVenta = await Venta.updateOne({_id: req.params.ventaId},{$set: {waiterName:req.body.waiterName}});
        res.json(updatedVenta);
    }
    catch(err){
        res.status(500).json({error:err});
    }
});

// put in nodejs?
router.put("/:ventaId", async(req, res) => {
    try{
        const updatedVenta = await Venta.updateOne({_id: req.params.ventaId},{$set: {
            date: req.body.date,
            paymentMethod: req.body.paymentMethod,
            clientName: req.body.clientName,
            total: req.body.total,
            products: req.body.products
        }});
        res.json(updatedVenta);
    }
    catch(err){
        res.status(500).json({error:err});
    }
}) 


router.post('/',(req,res)=>{
    const venta = new Venta({
       // id: req.body.id,
       date: req.body.date,
       paymentMethod: req.body.paymentMethod,
       clientName: req.body.clientName,
       total: req.body.total,
       products: req.body.products
    });
    venta.save()
    .then(data=>{
        res.json(data);
    })
    .catch(err=>{
        res.json({message: err});
    })
});
module.exports = router;