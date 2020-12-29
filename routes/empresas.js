'use strict'

const express = require('express');
const multer = require('multer');
const empresaControlador = require('../controllers/empresa');

const api = express.Router();

const upload = multer();
const md_auth = require('../middlewares/authenticated');

api.post('/empresa/uploadLogo',upload.single("file"), function (req, res , next){
    console.log(req)
});
api.post('/empresa/save', empresaControlador.save);
api.get('/empresa/getCategorias',empresaControlador.getCategorias);

module.exports = api;