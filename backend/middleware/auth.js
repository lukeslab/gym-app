const jwt = require('jsonwebtoken')
const User = require('../models/User')
const asyncHandler = require('express-async-handler')

// Middleware to verify JWT tokens
const verifyToken = asyncHandler(async (req, res, next) => {
    let token

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Get token from header
            token = req.headers.authorization.split(' ')[1]

            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            // Get user from token
            req.user = await User.findById(decoded.id).select('-password')

            if (!req.user) {
                return res.status(401).json({ message: 'User not found' })
            }

            next()
        } catch (error) {
            console.error(error)
            return res.status(401).json({ message: 'Not authorized, token failed' })
        }
    }

    if (!token) {
        return res.status(401).json({ message: 'Not authorized, no token' })
    }
})

// Middleware to check if user is active
const requireActiveUser = asyncHandler(async (req, res, next) => {
    if (!req.user.active) {
        return res.status(403).json({ message: 'Account is deactivated' })
    }
    next()
})

module.exports = {
    verifyToken,
    requireActiveUser
}