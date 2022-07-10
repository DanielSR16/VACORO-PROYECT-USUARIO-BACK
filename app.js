const express =  require('express');
const bodyParser = require('body-parser');
const { urlencoded } = require('body-parser');
const dotenv = require('dotenv').config();
const app =  express();
app.use(bodyParser.json());


//coneccion a db
require('./db/connection');

const userRouter = require('./routes/usuarios');
const mainRouter = require('./routes/main');

app.use('/usuario',userRouter);
app.use('/', mainRouter);




app.listen(3000,()=>{
    console.log('servidor corriendo')
})