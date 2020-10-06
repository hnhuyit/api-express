const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name: {

        required: true,
        type: String
    },
    unit: {

        required: true,
        type: String
    },
    price: {
        required: true,
        type: Number
    }
})


module.exports = mongoose.model('Product', productSchema)