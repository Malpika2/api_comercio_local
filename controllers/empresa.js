'use strict'

const Empresa = require('../models/empresas');
const multer = require('multer');
const { query } = require('express');


exports.uploadLogo = async function (req,res){
    // console.log('logoinfo',req.file);
    return res.status(200).send({
        message:'Logotipo Actualizado',
        filename: req.file.filename
    })
}
exports.save = async function (req, res ){
    const { id_usuario,nombre,descripcion,calle,colonia,municipio,estado,codigoPostal,celular,whatsapp,tags,categoria,filename} = req.body;

    const empresa = new Empresa({
        id_usuario: id_usuario,
        logo:filename,
        nombre: nombre,
        descripcion: descripcion,
        calle: calle,
        colonia: colonia,
        municipio: municipio,
        estado: estado,
        codigoPostal: codigoPostal,
        celular: celular,
        whatsapp: whatsapp,
        tags: `${tags},${nombre}`,
        categoria: categoria,
    })
    await empresa.save( (err, empresa) => {
        if(err) return console.error(err);

        // console.log(empresa);
        return res.status(200).send({
            message:'Empresa Registrada',
            empresa:empresa
        })
    })
}

exports.search = async (req, res) => {
    const {tags, categoria, municipio , page} = req.body;
    console.log('search: ',tags);
    console.log('categoria: ',categoria);
    console.log('municipio: ',municipio);
    console.log('page: ',page);
    if(tags == '' && categoria == '' && municipio=='' && page == 1){
        Empresa.
        find().limit(20).sort('nombre').exec( (err, result) => {
            console.log('todos');
            return res.status(200).send({
                result:result
            });
            
        });
    }else{
        // let query = {};
        // query.nombre = new RegExp(tags, 'i');
        // query.tags = new RegExp(tags, 'i');
        // query.categoria = new RegExp(categoria, 'i');
        // query.municipio = new RegExp(municipio, 'i');
        // query.nombre = new RegExp(nombre, 'i');
        // query.categoria = categoria.equals(categoria);
        // Empresa.find(query).
        // find( {tags: new RegExp(tags, 'i')}).
        // where("categoria").equals(categoria).
        // where('municipio').equals(municipio).
        Empresa.aggregate( [ 
                            { $match: { tags: new RegExp(tags, 'i') } }, 
                            { $match: { categoria: { '$regex': categoria } } }, 
                            { $match: { municipio: { '$regex': municipio } } } 
                        ] ).
        limit(20).
        sort('nombre').
        exec( (err, result) => {
            console.log(tags);
            return res.status(200).send({
                result:result
            });
            
        });
    }
// exec(callback);

}
