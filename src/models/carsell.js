const mongoose = require('mongoose');


const sellcar = new mongoose.Schema({
    name: {
        type: String,

    },
    email: {
        type: String,
    },
    phone: {
        type: String,

    },
    address: {
        type: String,
    },
    model: {
        type: String,

    },
    manufacturer: {
        type: String,

    },
    mileage: {
        type: Number,
        required: true
    },
    image: {
        type: String,

    },

    date: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('sellcar', sellcar); 