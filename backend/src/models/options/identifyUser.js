const moongose = require('mongoose');

const identifyUser = new moongose.Schema({

    name: { type: String, required: true, unique: true },
    password: { type: String, required: true, unique: true }

}, {
    timestamp: true
});

module.exports = moongose.model('identifyUser', identifyUser);