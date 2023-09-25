const mongoose = require('mongoose')

const sessionSchema = new mongoose.Schema({
    id: {
        type: String,
        require: true
    },
    status: {
        type: String,
        require: true
    },
    workout: {
        setCardsData: {
            type: Array,
            require: true
        }
    }
})

module.exports = mongoose.model('Session', sessionSchema)