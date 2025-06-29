const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is required'],
        unique: true,
        trim: true,
        minlength: [3, 'Username must be at least 3 characters long'],
        maxlength: [30, 'Username cannot exceed 30 characters']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true,
        trim: true,
        match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [8, 'Password must be at least 8 characters long'],
        select: false // Don't include password in queries by default
    },
    workouts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Workout"
    }],
    active: { 
        type: Boolean, 
        default: true 
    },
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
    }],
    lastLogin: {
        type: Date,
        default: Date.now
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
})

// Update lastLogin on successful login
userSchema.methods.updateLastLogin = function() {
    this.lastLogin = new Date()
    return this.save()
}

module.exports = mongoose.model('User', userSchema)