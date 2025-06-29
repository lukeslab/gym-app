const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')

// Generate JWT token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN || '30d'
    })
}

// @desc Register new user
// @route POST /auth/register
// @access Public
const registerUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body

    if (!username || !email || !password) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    // Check if user exists
    const userExists = await User.findOne({ 
        $or: [{ email }, { username }] 
    })

    if (userExists) {
        return res.status(400).json({ 
            message: 'User already exists with this email or username' 
        })
    }

    // Validate password strength
    if (password.length < 8) {
        return res.status(400).json({ 
            message: 'Password must be at least 8 characters long' 
        })
    }

    // Hash password
    const saltRounds = 12
    const hashedPassword = await bcrypt.hash(password, saltRounds)

    // Create user
    const user = await User.create({
        username,
        email,
        password: hashedPassword,
        active: true
    })

    if (user) {
        res.status(201).json({
            _id: user._id,
            username: user.username,
            email: user.email,
            token: generateToken(user._id)
        })
    } else {
        res.status(400).json({ message: 'Invalid user data' })
    }
})

// @desc Authenticate user & get token
// @route POST /auth/login
// @access Public
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' })
    }

    // Check for user
    const user = await User.findOne({ email }).select('+password')

    if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' })
    }

    // Check if user is active
    if (!user.active) {
        return res.status(403).json({ message: 'Account is deactivated' })
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid credentials' })
    }

    res.json({
        _id: user._id,
        username: user.username,
        email: user.email,
        token: generateToken(user._id)
    })
})

// @desc Get current user
// @route GET /auth/me
// @access Private
const getMe = asyncHandler(async (req, res) => {
    res.json({
        _id: req.user._id,
        username: req.user.username,
        email: req.user.email
    })
})

// @desc Logout user
// @route POST /auth/logout
// @access Private
const logoutUser = asyncHandler(async (req, res) => {
    // With JWT, logout is handled client-side by removing the token
    // You could implement a token blacklist here if needed
    res.json({ message: 'User logged out successfully' })
})

// @desc Change password
// @route PUT /auth/change-password
// @access Private
const changePassword = asyncHandler(async (req, res) => {
    const { currentPassword, newPassword } = req.body

    if (!currentPassword || !newPassword) {
        return res.status(400).json({ 
            message: 'Current password and new password are required' 
        })
    }

    const user = await User.findById(req.user._id).select('+password')

    // Check current password
    const isCurrentPasswordValid = await bcrypt.compare(currentPassword, user.password)

    if (!isCurrentPasswordValid) {
        return res.status(400).json({ message: 'Current password is incorrect' })
    }

    // Validate new password
    if (newPassword.length < 8) {
        return res.status(400).json({ 
            message: 'New password must be at least 8 characters long' 
        })
    }

    // Hash new password
    const saltRounds = 12
    const hashedNewPassword = await bcrypt.hash(newPassword, saltRounds)

    // Update password
    user.password = hashedNewPassword
    await user.save()

    res.json({ message: 'Password changed successfully' })
})

module.exports = {
    registerUser,
    loginUser,
    getMe,
    logoutUser,
    changePassword
}