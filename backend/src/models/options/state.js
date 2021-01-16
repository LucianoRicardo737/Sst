const moongose = require('mongoose');

const statesOfReparation = new moongose.Schema({
    name: { type: String, required: true },
    stateAdd: { type: String, required: true, unique: true }
}, {
    timestamp: true
});

module.exports = moongose.model('reparaciones_estados', statesOfReparation); 