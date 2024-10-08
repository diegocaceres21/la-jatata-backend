const express =require('express');
const cors = require('cors')
const app = express();

const mongoose = require('mongoose')
const bodyParser = require('body-parser')
require('dotenv/config');

const postsRoute = require('./routes/products')
const reservesRoute = require('./routes/reservas')
const comandasRoute = require('./routes/comandas')
const meserosRoute = require('./routes/meseros')
const ventasRoute = require('./routes/ventas')
const menusRoute = require('./routes/menu')
const tokensRoute = require('./routes/tokens')
const fcmRoutes = require('./routes/fcm')

app.use(cors());
app.use(bodyParser.json());
//ROUTES
app.use('/products',postsRoute);
app.use('/reservas',reservesRoute);
app.use('/comandas',comandasRoute);
app.use('/meseros',meserosRoute);
app.use('/ventas',ventasRoute);
app.use('/menu',menusRoute);
app.use('/tokens',tokensRoute);
app.use('/fcm',fcmRoutes);

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

//PORT
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Our app is running on port ${ PORT }`);
});
