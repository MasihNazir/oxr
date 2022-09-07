const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

mongoose.connect('mongodb+srv://masihnazir:CrMmgcPbu6Gkyji4@cluster0.z5gimen.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    family: 4,
})
    .then(() => {
        console.log("connection successful");
    }).catch((error) => {
        console.log(error);
    })