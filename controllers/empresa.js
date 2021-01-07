'use strict'

const Empresa = require('../models/empresas');
const multer = require('multer')


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
        tags: tags,
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
    // console.log('search: ',tags);
    // console.log('categoria: ',categoria);
    // console.log('municipio: ',municipio);
    // console.log('page: ',page);
    if(tags == '' && categoria == '' && municipio=='' && page == 1){
        Empresa.
        find().limit(20).sort('nombre').exec( (err, result) => {
            // console.log(result);
            return res.status(200).send({
                result:result
            });
            
        });
    }
    Empresa.
    find({ tags : { $regex: tags } }).
    where("categoria").equals(categoria).
    where('municipio').equals(municipio).
    limit(20).
    sort('nombre').
    exec( (err, result) => {
        // console.log(result);
        return res.status(200).send({
            result:result
        });
        
    });
// exec(callback);

}
