'use strict'

const express = require('express');
const app = express(); //Se crea el servidor con express
var cors = require('cors')
const user_routes = require('./routes/user'); // importamos rutas
const empresas_routes = require('./routes/empresas');
const categorias_routes = require('./routes/categorias');


// Middlewares (ejecutar metodo antes del controlador) * BodyParse convierte el body de las consultas a JSON
app.use(cors())
app.use(express.urlencoded({extended:true}));; // archivos
app.use(express.json());



// Routes
app.use('/api',empresas_routes);
app.use('/api',user_routes); 
app.use('/api',categorias_routes);



// Exportar modulo para usar la variable fuera de este archivo
module.exports = app; 
