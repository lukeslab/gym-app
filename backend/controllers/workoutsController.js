const Workout = require('../models/Workout')
const User = require('../models/User');
const asyncHandler = require('express-async-handler');

// @desc Get list of workouts by user
// @route GET /workouts/user/:id
// @access Private
const getWorkoutsByUser = asyncHandler( async (req, res) => {
    const { id } = req.params;

    if (!id) return res.status(400).json({ message: "User id is required" })

    const user = await User.findById(id).select('-password').populate('workouts')
    const workouts = user.workouts.map( workout => {
       return {
            id: workout._id.toString(),
            title: workout.title
        } 
    })
    console.log(user, workouts)

    if (!workouts || !workouts.length) return res.status(400).json({ message: "No workouts for this user." })

    return res.json(workouts);
})

// @desc Get a workout by Id
// @route GET /workouts/:id
// @access Private
const getWorkoutById = asyncHandler(async (req, res) => {
    const { id } = req.params

    if (!id) return res.status(400).json({ message: "Workout id required"})

    const workout = await Workout.findById(id).populate('exercises').lean()
    console.log("Got workout:", workout)
    if (workout) res.json(workout)
    else res.status(400).json({ message: "Workout not found" })
})

// @desc Create a workout
// @route POST /workouts
// @access Private
const createWorkout = asyncHandler(async (req, res) => {
    const { title, exercises, userId } = req.body
    if (!title || !Array.isArray(exercises) || !exercises.length || !userId) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    //Check for duplicate workout
    const duplicate = await Workout.findOne({ title })
    if (duplicate) return res.status(400).json({ message: 'A workout with that title already exists.'})

    const workout = await Workout.create({ title, exercises })
    if (!workout) return res.status(400).json({ message: 'Invalid workout data' })
    
    // update the user's document property "workouts"
    const user = await User.findById(userId)
    user.workouts = [...user.workouts, workout._id]
    user.save();

    res.status(201).json({ message: `The workout ${title} was created!`})


})

// @desc Update a workout
// @route PUT /workouts
// @access Private
const updateWorkout = asyncHandler(async (req, res) => {
    console.log(req.body)
    const { id, updatedExercises } = req.body

    if (!id) return res.status(400).json({ message: 'Workout id is required' })

    const workout = await Workout.findById(id).exec()
    if (!workout) return res.status(400).json({ message: 'Workout not found' })
    workout.exercises = updatedExercises
    workout.save()
    
    res.status(200).json({ message: `The workout ${workout.title} was updated.`})
    console.log('updated')
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
    updateWorkout,
    deleteWorkout
}