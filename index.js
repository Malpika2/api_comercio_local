'use strict'// Ecmascript 6

const mongoose = require('mongoose'); // modulo para conectar a MongoDB
const app = require('./app'); //Configuracion de Express
const port = 3800;

//Indicamos a mongoose que se hara la conexion con promesas
mongoose.Promise = global.Promise; 
// mongodb+srv://malpka:MongoDBMalpika256..>@comerciolocal.erh4o.gcp.mongodb.net/<dbname>?retryWrites=true&w=majority
mongoose.connect('mongodb+srv://malpka:wT4wvduyyHwZZsp@comerciolocal.erh4o.gcp.mongodb.net/comerciolocal?retryWrites=true&w=majority', { useMongoClient:true})
    .then( () => {
        console.log("La conexion a la base de datos comercio_local_mx se ha realizado correctamente")

        // Crear servidor con node
        app.listen(port, () => {
            console.log("Servidor corriendo en el puerto 3800");
        });
    })
    .catch(err => console.log(err)); //Error de conexion