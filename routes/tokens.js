const express =require('express');

const router = express.Router();
const Token = require('../models/Token')

//express get http one propertyonly?
//GET ALL PRODUCTS
router.get('/', async (req,res)=>{
    try{
        const tokens = await Token.find();
        res.json(tokens);
    }
    catch(err){
        res.status(500).json({error:err});
    }
});

//DELETE
router.delete('/:tokenId', async (req,res)=>{
    try{
        const removedToken = await Token.findByIdAndDelete(req.params.tokenId);
        res.json(removedToken);
    }
    catch(err){
        res.status(500).json({error:err});
    }
});


router.post('/',(req,res)=>{
    const token = new Token({
       // id: req.body.id,
        token: req.body.token
    });
    token.save()
    .then(data=>{
        res.json(data);
    })
    .catch(err=>{
        res.json({message: err});
    })
});

//post many items express.js?
module.exports = router;