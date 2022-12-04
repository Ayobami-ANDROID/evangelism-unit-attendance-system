const mongoose = require('mongoose');

const connectDB = (URL) =>{
    mongoose.connect(URL,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(() => console.log('connected to db')).catch(err => console.log(err))
}

module.exports = connectDB