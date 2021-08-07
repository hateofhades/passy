const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.status(200).json({ "message": "Welcome to the v1 of the API. For documentation check: https://github.com/hateofhades/passy" });
});
router.use('/accounts', require('./accounts.js'));

module.exports = router;