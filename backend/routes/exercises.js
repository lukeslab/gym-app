const express = require('express');
const router = express.Router();
const exerciseController = require('../controllers/exercisesController')

router.route('/')
    .get(exerciseController.getAllExercises)
    .post(exerciseController.createExercise)
router.route('/:id')
    .get(exerciseController.getExerciseByExerciseId)

module.exports = router