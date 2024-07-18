const express =require('express');

const router = express.Router();
const Menu = require('../models/Menu')


//nodejs http get by date?
//GET ALL RESERVES
router.get('/all', async (req,res)=>{
    try{
        const menus = await Menu.find();
        res.json(menus);
    }
    catch(err){
        res.json({message:err});
    }
});


//GET PRODUCT BY ID
router.get('/:menuId', async (req,res)=>{
    try{
        const menu = await Menu.findById(req.params.menuId);
        res.json(menu);
    }
    catch(err){
        res.json({message:err});
    }
});


router.get('/', async function(req, res) {
    try{
        let tdate = req.query.date;
        const menu = await Menu.findOne({date:tdate})
        res.json(menu);
    }
    catch(err){
        res.json({message:err});
    }
});


//DELETE
//nodejs pass date as query param?
router.delete('/:menuId', async (req,res)=>{
    try{
        const removedMenu = await Menu.remove({_id: req.params.menuId});
        res.json(removedMenu);
    }
    catch(err){
        res.json({message:err});
    }
});

//ACOMODAR
router.patch('/:menuId', async (req,res)=>{
    try{
        const updatedMenu = await Menu.updateOne({_id: req.params.menuId},{$set: {products:req.body.products}});
        res.json(updatedMenu);
    }
    catch(err){
        res.json({message:err});
    }
});

// put in nodejs?
/*router.put("/:ventaId", async(req, res) => {
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
*/

router.post('/',(req,res)=>{
    const menu = new Menu({
       // id: req.body.id,
       date: req.body.date,
       products: req.body.products
    });
    menu.save()
    .then(data=>{
        res.json(data);
    })
    .catch(err=>{
        res.json({message: err});
    })
});
module.exports = router;