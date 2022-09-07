const mongoose = require('mongoose');

const partrequest = new mongoose.Schema({
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
    address: {
        type: String,
        required: true
    },
    manufacturar: {
        type: String,

    },
    model: {
        type: String,

    },
    partname: {
        type: String,

    },
    detail: {
        type: String,
    },
    registerdate: {
        type: Date,
        default: Date.now()
    }
});
module.exports = mongoose.model('partrequest', partrequest); 