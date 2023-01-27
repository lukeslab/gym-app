const Workout = require('../models/Workout')
const asyncHandler = require('express-async-handler');
const User = require('../models/User');

// @desc Get list of workouts by user
// @route GET /workouts/user/:id
// @access Private
const getWorkoutsByUser = asyncHandler( async (req, res) => {
    const { id } = req.params;

    if (!id) return res.status(400).json({ message: "User id is required" })

    const user = await User.findById(id).exec()
    const workouts = user.workouts

    if (!workouts || workouts.length) return res.status(400).json({ message: "No workouts for this user." })

    return res.json(workouts);
})

// @desc Get a workout by Id
// @route GET /workouts/:id
// @access Private
const getWorkoutById = asyncHandler(async (req, res) => {
    const { id } = req.params

    if (!id) return res.status(400).json({ message: "Workout id required"})

    const workout = await Workout.findById(id).populate('exercises').exec()
    if (workout) res.json(workout)
    else res.status(400).json({ message: "Workout not found" })
})

// @desc Create a workout
// @route POST /workouts
// @access Private
const createWorkout = asyncHandler(async (req, res) => {
    const { title, exercises } = req.body
    if (!title || !Array.isArray(exercises) || !exercises.length) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    //Check for duplicate workout
    const duplicate = await Workout.findOne({ title })
    if (duplicate) return res.status(400).json({ message: 'A workout with that title already exists.'})

    const workout = await Workout.create({ title, exercises })
    if (!workout) return res.status(400).json({ message: 'Invalid workout data' })
    res.status(201).json({ message: `The workout ${title} was created!`})
})

// @desc Delete a workout
// @route DELETE /workouts
// @access Private
const deleteWorkout = asyncHandler(async (req, res) => {
    const { id } = req.body

    if (!id) return res.status(400).json({ message: 'Workout id is required' })

    const workout = await Workout.findByIdAndDelete(id).lean().exec()
    if (!workout) return res.status(400).json({ message: 'Workout not found' })

    res.status(200).json({ message: `The workout ${workout.title} was deleted.`})

})


module.exports = {
    getWorkoutsByUser,
    getWorkoutById,
    createWorkout,
    deleteWorkout
}