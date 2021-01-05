'use strict'

const Categoria = require("../models/categorias");

// METODOS

exports.getCategorias = function (req, res){
    Categoria.find( (err, result) => {
        if(err) return res.status(400).send({
            message:'Error',
            error:err
        })
        const categorias =result.map( (resu) => resu.name);
        // console.log(categorias);
        return res.status(200).send({
            message:'Categorias encontradas',
            response:categorias
        })
    });
}

exports.registrarCategoria = function (req, res){
    const {name} = req.body;
    const categoria = new Categoria({
        name
    });
    categoria.save( (err, categoria ) => {
        if(err) return res.status(400).send({
            message:'Error',
            error:err
        })
        return res.status(200).send({
            message: 'Categoria Registrada',
            categoria:categoria
        })
    });
}