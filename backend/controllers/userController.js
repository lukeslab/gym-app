const User = require('../models/User')
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')

// @desc Get all users
// @route GET /users
// @access Private
const getAllUsers = asyncHandler(async (req, res) => {
    const users = await User.find().select('-password').lean()
    if (!users){
        return res.status(400).json({ message: 'No users found' })
    }
    res.json(users);
})

// @desc Get a specific user by ID
// @route GET /users/:id
// @access Private
const getUserById = asyncHandler(async (req, res) => {
    const { id } = req.params

    const user = await User.findById(id).select('-password').lean()

    if (!user) return res.status(400).json({ message: 'User not found.'})
    return res.json(user)
})

// @desc Create all users
// @route POST /users
// @access Private
const createNewUser = asyncHandler(async (req, res) => {
    const { username, password } = req.body

    if (!username || !password) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    // check for duplicate user
    const duplicate = await User.findOne({ username }).lean().exec() //What does lean and exec do?

    if (duplicate) return res.status(409).json({ message: 'Duplicate username' })

    // Hash the password
    const hashedPwd = await bcrypt.hash(password, 10)
    const userObject = { username, "password": hashedPwd}

    // Create and store new user
    const user = await User.create(userObject)

    if (user) res.status(201).json({ message: `New user ${username} created!` })
    else res.status(400).json({ message: "Invalid user data received" })
})

// @desc Update a users
// @route PATCH /users
// @access Private
const updateUser = asyncHandler(async (req, res) => {
    const { id, username, password } = req.body

    //confirm data
    if (!id || !username || !password) return res.status(400).json({ message: "All fields are required" })

    const user = await User.findById(id).exec()

    if (!user) return res.status(400).json({ message: 'User not found' })

    // Check for duplicate
    const duplicate = await User.findOne({ username }).lean().exec()
    // Allow updates to original user.  
    if (duplicate && duplicate?._id.toString() !== id) return res.status(409).json({ message: 'User already exists' }) 

    user.username = username

    if (password) {
        // Hash password
        user.password = await bcrypt.hash(password, 10)
    }

    const updatedUser = await user.save()

    res.json({ message: `${updatedUser.username} updated` })
})

// @desc Delete a user
// @route DELETE /users
// @access Private
const deleteUser = asyncHandler(async (req, res) => {
    const { id } = req.body

    if (!id) return res.status(400).json({ message: 'User ID is required' })

    const user = await User.findById(id).exec()

    if (!user) return res.status(400).json({ message: 'User not found' })

    const result = await User.deleteOne()

    const reply = `Username ${result.username} with ID ${result._id} deleted}` 
})

module.exports = {
    getAllUsers,
    createNewUser,
    getUserById,
    updateUser,
    deleteUser
}
