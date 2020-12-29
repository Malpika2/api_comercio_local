'use strict'

const Empresa = require('../models/empresas');
const multer = require('multer')
// const upload = multer({ dest: '../uploads/'}).single('logo')
exports.getCategorias = function (req, res){
    const categoria = req.params.categoria;
    
    Empresa.find({ categoria: categoria}, 'categoria', (err, categorias) => {
        if(err) {
            return res.status(500).send({
                message:'Error en la peticion'
            })
        }

        if(!categorias) {
            return res.status(404).send({message:'No hay Categorias'})
        }
    
        return res.status(200).send({
            categorias
        })
    });
}
exports.uploadLogo = async function (req,res){
    // app.post('/profile', upload.single('avatar'), function (req, res, next) {
    //     upload(req,res, (err) => {
    //     if (err instanceof multer.MulterError){
    //         console.log(err);
    //         return res.status(400).send({
    //             message:"Multer error",
    //             error: err
    //         });
    //     }else if(err){
    //         console.log(err);
    //         return res.status(400).send({
    //             message:"Error desconocido while upload",
    //             error: err
    //         });
    //     }
    //     return res.status(200).send({
    //         message:"Archivo Subido"
    //     })
    // });
}
exports.save = async function (req, res ){
    const { id_usuario,nombre,descripcion,calle,colonia,municipio,estado,codigoPostal,celular,whatsapp,tags,categoria} = req.body;

    const empresa = new Empresa({
        id_usuario: id_usuario,
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

        console.log(empresa);
        return res.status(200).send({
            message:'Empresa Registrada',
            empresa:empresa
        })
    })
}
