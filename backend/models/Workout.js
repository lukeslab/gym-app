const mongoose = require('mongoose')
const { stringify } = require('uuid')

const workoutSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true,   
    },
    exercises: {
        type: Array,
        require: true
    },
},
{
    timestamps: true
}
)

module.exports = mongoose.model('Workout', workoutSchema)