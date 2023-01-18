const Exercise = require('../models/Exercise')
const asyncHandler = require('express-async-handler')

// @desc Create an exercise
// @route POST /exercises
// @access Private
const createExercise = asyncHandler(async (req, res) => {
    const { title, sets, reps, weight } = req.body

    if (!title || !sets || typeof sets !== 'number' || !reps || typeof reps !== 'number' || !weight || typeof weight !== 'number') {
        return res.status(400).json({ message: 'All fields are required' })
    }

    // dupe check
    const duplicate = await Exercise.findOne({ title }).lean().exec()
    if (duplicate) return res.status(400).json({ message: 'Duplicate exercise found' })

    // Create
    const exercise = await Exercise.create({ title, sets, reps, weight })
    if (exercise) res.status(201).json({ message: `New exercise ${title} created!`})
    else res.status(400).json({ message: 'Invalid exercise data'})
})

module.exports = {
    createExercise
}

