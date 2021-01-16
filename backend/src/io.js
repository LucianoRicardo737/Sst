const server = require('./index');
const { IP_ACEPT_DATA, PORT_ACEPT_DATA } = process.env;

const Client = require('./models/client');
const Repair = require('./models/repair');
const Msg = require('./models/messages');

const SocketIO = require('socket.io');
let io = SocketIO(server, {
  cors: {
    origin: `http://${IP_ACEPT_DATA}:${PORT_ACEPT_DATA}`,
    methods: ["GET", "POST"],
    credentials: true
  }
});

io.on('connection', function (socket) {


  //cargar clientes
  socket.on('cliente', () => {
    try {
      const getClients = Client.find().then(data => {
        io.emit('clientes', (data));
      });
    } catch (error) {
      console.log(error)
    }

  });
  //cargar Ordenes
  socket.on('order', () => {
    try {
      const getOrders = Repair.find().then(data => {
        io.emit('orders', (data));
      });
    } catch (err) {
      console.log(err);
    }
  })

  //cargar Mensajes
  socket.on('message', () => {
    try {

      const getMsgs = Msg.find().then(data => {

        if (data) {
          console.log(data[0].reparation)
        } else {
          console.log("chau")
        }


        io.emit('messages', (data));
      });
    } catch (err) {
      console.log(err);
    }
  })





})
