const mongoose = require('mongoose');


const addcar = new mongoose.Schema({
    year: {
        type: Number,
        required: true
    },
    make: {
        type: String,
        required: true

    },
    model: {
        type: String,
        required: true

    },
    odometer: {
        type: String,
        required: true

    },
    exteriorcolor: {
        type: String,
        required: true

    },
    interiorcolor: {
        type: String,
        required: true

    },
    trim: {
        type: String,
        required: true

    },
    wheels: {
        type: String,
        required: true

    },
    title: {
        type: String,
        required: true

    },
    enginesize: {
        type: String,
        required: true

    },
    transmission: {
        type: String,
        required: true

    },
    drivetrain: {
        type: String,
        required: true

    },
    detail: {
        type: String,
        required: true

    },
    images: {
        type: [String],
        required: true


    },
    price: {
        type: String,
        required: true


    },
    date: {
        type: Date,
        default: Date.now()
    }


});

module.exports = mongoose.model('addcar', addcar); 