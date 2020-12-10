'use strict'
const mongoose = require('mongoose'); //Creamos modulo mongoose
const Schema = mongoose.Schema; //Objeto esquema y sus atributos
const UserSchema = Schema({
    name:String,
    telefono:Number,
    email:String,
    password:String
}); //Creamos el objeto del esquema y sus atributos

module.exports = mongoose.model('User', UserSchema);