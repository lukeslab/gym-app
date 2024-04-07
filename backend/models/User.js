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
        ref: "Workout"
    }],
    active: { type: Boolean },
    exerciseHistory: [{
        exerciseId: mongoose.Schema.Types.ObjectId,
        target: {
            sets: Number,
            reps: Number,
            weight: Number,
        },
        actual: {
            sets: Number,
            reps: Number,
            weight: Number,
        },
        dateCompleted: Date
    }]
})

module.exports = mongoose.model('User', userSchema)