const mongoose = require('mongoose');

const carinquiry = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    carid: {
        type: String

    },
    carmodel: {
        type: String

    },
    carmake: {
        type: String

    }
})

module.exports = mongoose.model('carinquiry', carinquiry)