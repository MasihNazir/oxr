const mongoose = require('mongoose');

const quickquote = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    service: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    detail: {
        type: String,
        required: true
    },
    registerdate: {
        type: Date,
        default: Date.now()
    }
});
module.exports = mongoose.model('quickquote', quickquote); 