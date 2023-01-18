const express = require('express');
const router = express.Router();
const workoutsController = require('../controllers/workoutsController')

router.route('/')
    .post(workoutsController.createWorkout)
    .delete(workoutsController.deleteWorkout)

router.route('/:id')
    .get(workoutsController.getWorkoutById)


module.exports = router