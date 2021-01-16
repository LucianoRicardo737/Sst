const mongoose = require('mongoose');


const repairSchema = new mongoose.Schema({

    numberid: { type: Number, uniqued: true, required: true },
    type: { type: String, required: false },
    brand: { type: String, required: false },
    model: { type: String, required: false },
    nserie: { type: String, required: false },
    failure: { type: String, required: false },
    state: { type: String, required: false },
    pacord: { type: Number, required: false },
    seña: { type: Number, required: false },
    observation: { type: String },
    client: { type: String, required: true },
    createdby: { type: String, required: true },
    promised: { type: Date, required: false }

},
    {
        timestamps: true
    }
);

module.exports = mongoose.model('reparaciones', repairSchema);