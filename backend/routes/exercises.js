const express = require('express');
const router = express.Router();
const exerciseController = require('../controllers/exercisesController')

router.route('/')
    .post(exerciseController.createExercise)

module.exports = router