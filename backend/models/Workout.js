const mongoose = require('mongoose')
const { stringify } = require('uuid')

const workoutSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true,   
    },
    exercises: {
        // type: Array,
        // require: true
        type: mongoose.Schema.Types.ObjectId,
        ref: "Exercise"
    },
},
{
    timestamps: true
}
)

module.exports = mongoose.model('Workout', workoutSchema)