const express = require('express');
const router = express.Router();
const db = require('../database');

router.post('/register', (req, res) => {
    let { username, email, password } = req.body;
    if (username.match(/^[a-z0-9_-]{6,28}$/) && email.match(/\S+@\S+\.\S+/) && password.match(/(?=(.*[0-9]))((?=.*[A-Za-z0-9])(?=.*[A-Z])(?=.*[a-z]))^.{8,}$/)) {
        if (db.registerAccount(username, email, password))
            res.status(200).json({ code: 0, message: "Account registered! Please login." })
        else res.status(200).json({ code: 2, error: "Username is already taken! Please try agin." })
    }
    else res.status(200).json({ code: 1, error: "Could not register account!" });
});

module.exports = router;