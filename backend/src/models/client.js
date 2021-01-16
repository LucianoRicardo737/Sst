const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
    name: { type: String, required: true },
    lastname: { type: String, required: true },
    dni: { type: Number },
    address: { type: String, required: false },
    telephone: { type: String, required: false },
    fijo: { type: String, required: false },
    prefijo: { type: String, required: false },
    codigo: { type: String, required: false },
    email: { type: String, required: false },
    city: { type: String, required: false },
    observation: { type: String, required: false }
},
    {
        timestamps: true
    });

module.exports = mongoose.model('clientes', clientSchema);