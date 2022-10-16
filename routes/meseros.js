const express =require('express');

const router = express.Router();
const Mesero = require('../models/Mesero')


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
        waiterName: req.body.waiterName
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