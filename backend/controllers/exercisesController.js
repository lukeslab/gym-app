const Exercise = require('../models/Exercise')
const asyncHandler = require('express-async-handler')

// @desc Get an exercise by id number
// @route GET /exercises/:id
// @access Private
const getExerciseByExerciseId = asyncHandler( async (req, res) => {
    const { id } = req.params
    const exercise = await Exercise.findById(id);
    if(!exercise) return res.status(400).json({ message: "Exercise ID not found" })

    console.log(`Found exercise id ${id}: `, exercise)
    return res.json(exercise)
})


// @desc Get all exercises in the app db
// @route GET /exercises
// @access Private
const getAllExercises = asyncHandler( async (req,res) => {
    let exercises = await Exercise.find({});

    console.log(exercises)
    if(!exercises || !exercises.length) return res.status(400).json({ message: "Exercises not found" })

    exercises = exercises.map( exercise => {
        console.log(exercise)
        return {
            id: exercise._id.toString(),
            title: exercise.title,
            target: exercise.target,
            restInterval: exercise.restInterval,
            stats: exercise.stats
        }        
    })

    console.log("All exercises: ", exercises)
    return res.json(exercises);
})


// @desc Create an exercise
// @route POST /exercises
// @access Private
const createExercise = asyncHandler(async (req, res) => {
    const { title, sets, reps, weight } = req.body

    if (!title || !sets || !reps || !weight) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    // dupe check
    const duplicate = await Exercise.findOne({ title }).lean().exec()
    if (duplicate) return res.status(400).json({ message: 'Duplicate exercise found' })

    // Create
    const exercise = await Exercise.create({ title, sets, reps, weight })
    console.log(exercise)
    if (exercise) res.status(201).json({ message: `New exercise ${title} created!`})
    else res.status(400).json({ message: 'Invalid exercise data'})
})

module.exports = {
    createExercise,
    getAllExercises,
    getExerciseByExerciseId
}

