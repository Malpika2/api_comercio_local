'use strict'
const jwt = require('jsonwebtoken');
const moment = require('moment');
const secretKey = 'Malpika_G'; 

exports.ensureAuth = function(req, res, next){
    if(!req.headers.authorization){
        return res.status(403).send({message:'La peticion no tiene cabecera de autenticación'});
    }else{
        const token = req.headers.authorization.replace(/[""]+/g,'');
        try{
            const payload = jwt.decode(token,secretKey);
            if(payload.exp > moment().unix()){
                return res.status(401).send({
                    message:'El token ha expirado'
                });
            }
        } catch (ex){
            return res.status(404).send({
                message:'El token no es valido'
            });
        }
        req.user = payload;
        next();
    }
}