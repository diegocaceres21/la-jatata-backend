const express =require('express');

const router = express.Router();
const Product = require('../models/Product')


//GET ALL PRODUCTS
router.get('/all', async (req,res)=>{
    try{
        const products = await Product.find().sort({name:1});
        res.json(products);
    }
    catch(err){
        res.json({message:err});
    }
});

router.get('/', async function(req, res) {
    try{
        let cat = req.query.category;
        const products = await Product.find({category:cat}).sort({name:1});
        //const reserve = await Reserva.find(req.query.date);
        res.json(products);
    }
    catch(err){
        res.json({message:err});
    }
    //const date = new Date(req.query.date);
});

//express.js get contains?
//Person.find({username: {$regex: '(.*)adm(.*)'}})

///test/i

router.get('/filter', async function(req, res) {
    try{
        let search = req.query.search;
        const products = await Product.find({name:{$regex: '(.*)' + search + '(.*)'}});
        console.log(products);
        //const reserve = await Reserva.find(req.query.date);
        res.json(products);
    }
    catch(err){
        res.json({message:err});
    }
    //const date = new Date(req.query.date);
});

//GET PRODUCT BY ID
router.get('/:productId', async (req,res)=>{
    try{
        const product = await Product.findById(req.params.productId);
        res.json(product);
    }
    catch(err){
        res.json({message:err});
    }
});

//DELETE
router.delete('/:productId', async (req,res)=>{
    try{
        const removedProduct = await Product.remove({_id: req.params.productId});
        res.json(removedProduct);
    }
    catch(err){
        res.json({message:err});
    }
});

router.patch('/:productId', async (req,res)=>{
    try{
        const updatedProduct = await Product.updateOne({_id: req.params.productId},{$set: {price:req.body.price}});
        res.json(updatedProduct);
    }
    catch(err){
        res.json({message:err});
    }
});
/*router.get('/inside',(req,res)=>{
    res.send('Inside request')
});*/

//sort get express

router.post('/',(req,res)=>{
    const product = new Product({
       // id: req.body.id,
        name: req.body.name,
        category: req.body.category,
        price: req.body.price,
        day:req.body.day  
    });
    product.save()
    .then(data=>{
        res.json(data);
    })
    .catch(err=>{
        res.json({message: err});
    })
});
module.exports = router;