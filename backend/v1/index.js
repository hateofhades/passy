const express = require('express');
const router = express.Router();

router.use('/auth', require('./auth.js'));
router.use('/passwords', require('./passwords.js'));

module.exports = router;