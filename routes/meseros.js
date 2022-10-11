const express =require('express');

const router = express.Router();
const Mesero = require('../models/Product')


//GET ALL PRODUCTS
router.get('/', async (req,res)=>{
    try{
        const meseros = await Mesero.find().sort({waiter_name:1});
        res.json(meseros);
    }
    catch(err){
        res.json({message:err});
    }
});


router.get('/filter', async function(req, res) {
    try{
        let search = req.query.search;
        const meseros = await Mesero.find({name:{$regex: '(.*)' + search + '(.*)'}});
        console.log(meseros);
        //const reserve = await Reserva.find(req.query.date);
        res.json(meseros);
    }
    catch(err){
        res.json({message:err});
    }
    //const date = new Date(req.query.date);
});

//GET PRODUCT BY ID
router.get('/:meseroId', async (req,res)=>{
    try{
        const mesero = await Mesero.findById(req.params.meseroId);
        res.json(mesero);
    }
    catch(err){
        res.json({message:err});
    }
});

//DELETE
router.delete('/:meseroId', async (req,res)=>{
    try{
        const removedMesero = await Mesero.remove({_id: req.params.meseroId});
        res.json(removedMesero);
    }
    catch(err){
        res.json({message:err});
    }
});

/*router.patch('/:productId', async (req,res)=>{
    try{
        const updatedProduct = await Product.updateOne({_id: req.params.productId},{$set: {price:req.body.price}});
        res.json(updatedProduct);
    }
    catch(err){
        res.json({message:err});
    }
});*/
/*router.get('/inside',(req,res)=>{
    res.send('Inside request')
});*/

//sort get express

router.post('/',(req,res)=>{
    const mesero = new Mesero({
       // id: req.body.id,
        waiter_name: req.body.waiter_name
    });
    mesero.save()
    .then(data=>{
        res.json(data);
    })
    .catch(err=>{
        res.json({message: err});
    })
});
module.exports = router;