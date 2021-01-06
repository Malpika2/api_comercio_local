'use strict'

const express = require('express');
const path = require('path');
const multer = require('multer');
const empresaControlador = require('../controllers/empresa');
const { v4: uuidv4 } = require('uuid');
const api = express.Router();

// Config
const storage = multer.diskStorage({
    destination: path.join(__dirname, '../uploads'),
    filename: (req, file, cb) => {
        cb(null,uuidv4()+ path.extname(file.originalname).toLocaleLowerCase());
    }
})
const upload = multer({
    storage,
    dest: path.join(__dirname, '/uploads'),
    limits: {fileSize: 1000000},
    fileFilter: (req, file, cb) => {
        const filetypes = /jpeg|jpg|png/;
        const mimetype = filetypes.test(file.mimetype);
        const extname = filetypes.test(path.extname(file.originalname));

        if(mimetype && extname){
            return cb(null,true);
        }
        cb('Error: Tipo de archivo invalido')
    }
}).single('file');

// Middlewares
const md_auth = require('../middlewares/authenticated');


api.post('/empresa/uploadLogo', upload, empresaControlador.uploadLogo);
api.post('/empresa/save', empresaControlador.save);
api.post('/empresa/search', empresaControlador.search);

module.exports = api;