'use strict'

const express = require('express'); //Express para poder crear rutas
//cargamos controlador user
const userControlador = require('../controllers/user');
//Llamamos al router
const api = express.Router();  
//cargamos al middleW
const md_auth = require('../middlewares/authenticated'); 

// Creamos una ruta para los métodos que tenemos en nuestros controladores
api.post('/user/save', userControlador.saveUser);
api.get('/user/:id', md_auth.ensureAuth, userControlador.getUser);

module.exports = api;//Exportar la configuracion