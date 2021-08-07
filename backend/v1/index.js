const express = require('express');
const router = express.Router();

router.use('/accounts', require('./accounts.js'));
router.use('/passwords', require('./passwords.js'));

module.exports = router;