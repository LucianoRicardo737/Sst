const mongoose = require('mongoose');


const messageSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: false },
    msg: { type: String, required: true, unique: false },
    reparation: { type: String, required: true, unique: false },
    stateEdit: { type: String, required: false, unique: false },
    pacordEdit: { type: Number, required: false, unique: false },
    señaEdit: { type: Number, required: false, unique: false },
    fechaEdit: { type: Date, required: false },
    userid: { type: String, required: true, unique: false }
},
    {
        timestamps: true
    })

module.exports = mongoose.model('reparaciones_mensajes', messageSchema);