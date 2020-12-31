'use strict'
const User = require('../models/users');
const bcrypt = require('bcrypt');
//Cconseguir datos de un usuario
exports.getUser = function(req, res) {
    const userId = req.params.id;

    //buscar un documento por un  id
    User.findById(userId, (err, user) => {

        if (err) {
            return res.status(500).send({
                message: 'Error en la peticion'
            })
        }

        if (!user) {
            return res.status(404).send({ message: 'El usuario no existe' });
        }

        followThisUser(req.user.sub, userId).then((value) => {
            user.password = undefined;
            return res.status(200).send({
                user,
                following: value.following,
                followed: value.followed
            })
        })
    });
}

exports.saveUser = async function (req, res){
    const {telefono,nombre,email,password} = req.body;
    
    const diez = 10;
    const myPlaintextPassword = 's0/\/\P4$$w0rD';
    const someOtherPlaintextPassword = 'not_bacon';

     bcrypt.hash(password, diez, async   function(err, hash) {
        const user = new User({
            nombre:nombre,
            telefono:telefono,
            email:email,
            password:hash,
        fechaRegistro: new Date()});
            // console.log(req);
        await user.save( (err, user) =>  {
        
            if (err) return res.status(300).send({
                message:'Ocurrió un error al registrar el usuario',
                error: err
            })
            // console.log('new user saved');
            return res.status(200).send({
                message:'Usuario registrado',
                user:user
            })
        });
    });


}