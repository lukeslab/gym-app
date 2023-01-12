const mongoose = require('mongoose')

const exerciseSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true,
        
    },
    sets: {
        type: Number,
        require: true
    },
    reps: {
        type: Number,
        require: true
    }
})

module.exports = mongoose.model('Exercise', exerciseSchema)