const moongose = require('mongoose');

const typesOfProducts = new moongose.Schema({

    name: { type: String, required: true },
    typeProduct: { type: String, required: true, unique: true }

}, {
    timestamp: true
});

module.exports = moongose.model('reparaciones_tipo_de_productos', typesOfProducts);