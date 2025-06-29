const express = require('express')
const router = express.Router()
const authController = require('../controllers/authController')
const { verifyToken, requireActiveUser } = require('../middleware/auth')

router.route('/register')
    .post(authController.registerUser)

router.route('/login')
    .post(authController.loginUser)

router.route('/logout')
    .post(verifyToken, authController.logoutUser)

router.route('/me')
    .get(verifyToken, requireActiveUser, authController.getMe)

router.route('/change-password')
    .put(verifyToken, requireActiveUser, authController.changePassword)

module.exports = router