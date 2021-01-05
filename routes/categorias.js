'use strict'

const express = require('express');
const path = require('path');
const categoriaControlador = require('../controllers/categorias');
const api = express.Router();

// config

api.get('/categorias/getCategorias/',categoriaControlador.getCategorias);
api.post('/categorias/register/',categoriaControlador.registrarCategoria);

module.exports = api;