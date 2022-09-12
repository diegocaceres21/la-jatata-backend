const express =require('express');
const cors = require('cors')
const app = express();

const mongoose = require('mongoose')
const bodyParser = require('body-parser')
require('dotenv/config');

const postsRoute = require('./routes/products')
app.use(cors());
app.use(bodyParser.json());
//ROUTES
app.use('/products',postsRoute);


app.get('/',(req,res)=> {
    res.send('Hola Jatata')
});

app.get('/products',(req,res)=> {
    res.send('Hola Post')
});

mongoose.connect(process.env.DB_CONNECTION,{useNewUrlParser: true,useUnifiedTopology: true}, ()=>
    console.log("Connected succesfully")    
);
mongoose.connection.on("connected",()=>{
    console.log('Conectado')
})

app.listen(3000);