const mongoose = require('mongoose');
const { HOST, DATABASE } = process.env;
const MONGODB_URL = `mongodb://${HOST}/${DATABASE}`;

mongoose.connect(MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
})
    .then(db => console.log(`Conexion exitosa a MongoDB`))
    .catch(err => console.log(err));