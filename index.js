const express = require('express');
const { dbConnection } = require('./database/config');
require("dotenv").config();
const cors = require('cors');

//Crear servidor express
const app = express();

//Base de datos
dbConnection();

//CORS
app.use(cors());

//Directorio publico
app.use(express.static("public"));

//Lectura y parseo del body
app.use(express.json());

//Rutas
//TODO: auth crear,login,renew
app.use('/api/auth', require('./routes/auth'));
//TODO: CRUD: eventos
app.use('/api/events', require('./routes/events'));


//Escuchar peticiones
app.listen(process.env.PORT, () => {
  console.log(`Servidor corriendo es puerto ${process.env.PORT}`);
});


