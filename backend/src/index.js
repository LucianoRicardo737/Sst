// Habilitamos variables de entorno
require('dotenv').config();
const { IP_ACEPT_DATA, PORT_ACEPT_DATA } = process.env;
// requerimos express para el servidor http, cors para las peticiones y morgan para los detalles
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
// llamamos express a ejecucion
const app = express();



// requerimos base de datos
require('./database/db');

// middlewares
// morgan para los detalles en las peticiones
app.use(morgan('dev'));
// aceptamos archivos json
app.use(express.json())
// urlEncoded para no se que XD
app.use(express.urlencoded({ extended: false }));
// configuramos cors para que solo acepte peticiones del front
app.use(cors(
  {
    origin: `http://${IP_ACEPT_DATA}:${PORT_ACEPT_DATA}`,
    creadentials: true
  }
));


// damos ejecucion al puerto de entorno o al 5500
app.set('port', process.env.PORT || 5500);
// ejecutamos la app
const server = app.listen(app.get('port'), () => {
  console.log('Conexion Exitosa Por Puerto:', app.get('port'));
});



//routes
app.use('/usuarios', require('./routes/userCreate_Route'));
app.use('/clientes', require('./routes/clientCreate_Route'));
app.use('/reparaciones', require('./routes/repairsCreate_Route'));
app.use('/mensajes', require('./routes/messagesCreate_Route'));
app.use('/acciones', require('./routes/loginUser_Route'));
app.use('/identificando', require('./routes/identifyUser_Route'));
app.use('/generales', require('./routes/options_Routes'));

module.exports = server;


require('./io');
