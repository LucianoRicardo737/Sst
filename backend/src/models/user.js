const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    nickname: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    lastname: { type: String, required: true },
    password: { type: String, required: true },
    atribute: { type: String, required: true },
    role: { type: String, required: true }
}, {
    timestamps: true
});

module.exports = mongoose.model('users', userSchema);