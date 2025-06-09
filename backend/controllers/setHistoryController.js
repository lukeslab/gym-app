const SetHistory = require('../models/SetHistory')
const asyncHandler = require('express-async-handler')


// @desc Save a set
// @route POST /SetHistory
// @access Private

const saveSetHistory = asyncHandler(async (req, res) => {
    console.log(req.body)
    const { date, userId, exerciseId, setNumber, reps, weight } = req.body


    if (!date || !userId || !exerciseId || !setNumber || !reps || !weight) return res.status(400).json({ message: 'All fields are required' })

    // create setHistory
    const setHistory = await SetHistory.create(req.body)
    if (setHistory) return res.status(201).json({ message: "New setHistory created!" })
    else return res.status(400).json({ message: "Invalid setHistory data." })

})

module.exports = {
    saveSetHistory
}

