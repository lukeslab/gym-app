const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true,
        
    },
    password: {
        type: String,
        require: true,

    },
    workouts: [{
        type: mongoose.Schema.Types.ObjectId,
        default: "Leg Day",
        ref: "Workout"
    }],
    active: {
        type: Boolean,
        default: true,
    },
})

module.exports = mongoose.model('User', userSchema)