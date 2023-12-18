const mongoose = require('mongoose')

const connectDb = async () => {
    mongoose.connect("mongodb://127.0.0.1/eCommerce", {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(res => [
        console.log('Database Connected Successfully')
    ]).catch(err => {
        console.log(err);
    })
}

module.exports = connectDb