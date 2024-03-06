const Session = require('../models/Session')
const asyncHandler = require('express-async-handler')


// @desc Get the currently active session
// @route GET /session/active
// @access Private

const getActiveSession = asyncHandler(async (req, res) => {
    const activeSession = await Session.findOne({ status: "active" }).exec()
    console.log(activeSession)
    if (activeSession) return res.status(204).json(activeSession)
    else return res.status(400).json({ message: "There is no active session." })
})


// @desc Save a session
// @route POST /session
// @access Private

const saveSession = asyncHandler(async (req, res) => {
    console.log(req.body)
    const { workout: {id: workoutId, setCardsData} } = req.body


    if (!workoutId || !setCardsData) return res.status(400).json({ message: 'All fields are required' })

    // create session
    const session = await Session.create({ workoutId, setCardsData })
    if (session) return res.status(201).json({ message: "New session created!" })
    else return res.status(400).json({ message: "Invalid session data." })

})

module.exports = {
    saveSession,
    getActiveSession
}

