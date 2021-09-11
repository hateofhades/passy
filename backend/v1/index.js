const express = require('express');
const router = express.Router();

router.use('/accounts', require('./accounts.js'));

module.exports = router;