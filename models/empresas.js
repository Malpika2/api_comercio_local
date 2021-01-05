'use strict'
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EmpresaSchema = Schema({
    id_usuario: {String},
    logo: String,
    nombre: String,
    descripcion: String,
    calle: String,
    colonia: String,
    municipio: String,
    estado: String,
    codigoPostal: Number,
    celular: Number,
    whatsapp: Boolean,
    tags: String,
    categoria: String

});

module.exports = mongoose.model('Empresa',EmpresaSchema);