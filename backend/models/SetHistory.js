const mongoose = require('mongoose')

const setHistorySchema = new mongoose.Schema({
    date: Date,
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User' 
    },
    exerciseId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Exercise' 
    },
    setNumber: Number,
    reps: Number,
    weight: Number
},
{
    timeseries: {
        timeField: "date",
        metaField: "meta",
        granularity: "minutes"
    }
}
)

module.exports = mongoose.model('SetHistory', setHistorySchema)