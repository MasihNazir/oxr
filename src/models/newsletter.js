const mongoose = require('mongoose');

const newsletter = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    registerdate: {
        type: Date,
        default: Date.now()
    }
});
module.exports = mongoose.model('newsletter', newsletter); 