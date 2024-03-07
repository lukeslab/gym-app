const mongoose = require('mongoose')

const exerciseSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true,   
    },
    target: {
        type: Object,
        require: true
    },
    restInterval: {
        type: Number,
        require: true
    },
    stats: {
        type: Object,
        require: true
    }
})

module.exports = mongoose.model('Exercise', exerciseSchema)