const express =require('express');

const router = express.Router();
const Venta = require('../models/Venta')

//nodejs http get by date?
//GET ALL RESERVES
router.get('/all', async (req,res)=>{
    print('hola')
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
        res.json({message:err});
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
        res.json({message:err});
    }
});

router.get('/range/:start/:end', async (req,res)=>{
    const startDate = new Date(req.params.start);
    const endDate = new Date(req.params.end);
    try{
        const filteredData = Venta.filter((item) => {
            const itemDate = new Date(item.date);
            return itemDate >= startDate && itemDate <= endDate;
          });
        res.json(filteredData);
    }
    catch(err){
        res.json({message:err});
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
        res.json({message:err});
    }
    //const date = new Date(req.query.date);
});


//DELETE
//nodejs pass date as query param?
router.delete('/:ventaId', async (req,res)=>{
    try{
        const removedVenta = await Venta.remove({_id: req.params.ventaId});
        res.json(removedVenta);
    }
    catch(err){
        res.json({message:err});
    }
});

//ACOMODAR
router.patch('/:ventaId', async (req,res)=>{
    try{
        const updatedVenta = await Venta.updateOne({_id: req.params.ventaId},{$set: {waiterName:req.body.waiterName}});
        res.json(updatedVenta);
    }
    catch(err){
        res.json({message:err});
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
        res.json({message:err});
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