const mongoose = require('mongoose')

const sessionSchema = new mongoose.Schema({
    workout: {
        type: mongoose.Schema.Types.ObjectId,
        require: true
    },
    setCardsData: {
        type: [],
        require: true
    }
})

module.exports = mongoose.model('Session', sessionSchema)