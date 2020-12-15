'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const app = express(); //Se crea el servidor con express
var cors = require('cors')

const user_routes = require('./routes/user'); // importamos rutas

app.use(cors())


// Middlewares (ejecutar metodo antes del controlador) * BodyParse convierte el body de las consultas a JSON
app.use(express.urlencoded({extended:true}));; // archivos
app.use(express.json());
// app.use(bodyParser.urlencoded({extended: false}));
//Cargar rutas al servidor
app.use('/api',user_routes); 



// Exportar modulo para usar la variable fuera de este archivo
module.exports = app; 
