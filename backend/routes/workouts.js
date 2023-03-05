const express = require('express');
const router = express.Router();
const workoutsController = require('../controllers/workoutsController')

router.route('/')
    .post(workoutsController.createWorkout)
    .put(workoutsController.updateWorkout)
    .delete(workoutsController.deleteWorkout)

router.route('/:id')
    .get(workoutsController.getWorkoutById)

router.route('/user/:id')
    .get(workoutsController.getWorkoutsByUser)

module.exports = router