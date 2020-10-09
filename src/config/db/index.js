const mongoose = require('mongoose');



async function connect() {

    try {
        await mongoose.connect('mongodb://localhost:27017/edu_sys', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        });
        console.log('Connect Successfully!!!')
    } catch (error) {
        console.log('Connect failed');
    }

}

module.exports = { connect };