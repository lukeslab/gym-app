const express = require('express');
const router = express.Router();
const dataController = require('../controllers/dataController')


router.route('/seed')
    .get(dataController.createSetHistoryCollection)

router.route('/:id')
    .get(dataController.getSetHistoryByExerciseId)


module.exports = router