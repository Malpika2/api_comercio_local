'use strict'
const User = require('../models/users');

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

exports.saveUser = function (req, res){
    const {telefono,nombre,email,password} = req.body;

    const user = new User({name:nombre,
        telefono:telefono,
        email:email,
        password:password});
        console.log(req);
    user.save( (err, user) =>  {
    
        if (err) return console.error(err);
        console.log('new user saved');
        return res.status(200).send({
            message:'Created'
        })
    });
}