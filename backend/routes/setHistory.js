const express = require('express');
const router = express.Router();
const setHistoryController = require('../controllers/setHistoryController')

router.route('/')
    .post(setHistoryController.saveSetHistory)

module.exports = router