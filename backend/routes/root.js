const express = require('express');
const router = express.Router();
const path = require('path');

router.get('^/$|/index(.html)?', (req, res) => {
    console.log('hit root')
    res.sendFile(path.join(__dirname, '../client/build', 'index.html'))
})

module.exports = router