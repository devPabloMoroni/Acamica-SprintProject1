const express = require('express');
const morgan = require('morgan');
require('dotenv').config();
const db = require('../config/conection');

const app = express();
app.use(express.json());
app.use(morgan('dev'));


const init = require('./routes/init');
app.use('/', init);


app.listen(process.env.API_PORT, function (){
    console.log(`Servidor iniciado en el puerto ${process.env.API_PORT}...`);
});