const Session = require('../models/Session')
const asyncHandler = require('express-async-handler')

// @desc Save a session
// @route POST /session
// @access Private

const saveSession = asyncHandler( async (req, res) => {
    console.log(req.body)
    const { id, status, workout } = req.body


    if (!id || !status || !workout) return res.status(400).json({ message: 'All fields are required' })

    // run a duplicate check

    // create session
    const session = await Session.create({ id, status, workout })
    if (session) res.status(201).json({ message: "New session created!" })
    else res.status(400).json({ message: "Invalid session data." })

})

module.exports = {
    saveSession
}

