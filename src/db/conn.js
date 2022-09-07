const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

mongoose.connect(process.env.DB_CONNECT, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    family: 4,
})
    .then(() => {
        console.log("connection successful");
    }).catch((error) => {
        console.log(error);
    })