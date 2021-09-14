const express = require('express');
const router = express.Router();
const db = require('../database');
const helper = require('../helper');

router.post('/register', (req, res) => {
    let { username, email, password } = req.body;
    if (!helper.isAnyUndefined(username, email, password)) {
        if (username.match(/^[a-z0-9_-]{6,28}$/) && email.match(/\S+@\S+\.\S+/) && password.match(/(?=(.*[0-9]))((?=.*[A-Za-z0-9])(?=.*[A-Z])(?=.*[a-z]))^.{8,}$/)) {
            if (db.registerAccount(username, email, password)) {
                helper.createUserData(username, password);
                res.status(200).json({ code: 0, message: "Account registered! Please login." });
            }
            else res.status(200).json({ code: 2, error: "Username is already taken! Please try agin." })
        }
        else res.status(200).json({ code: 1, error: "Could not register account!" });
    } else res.status(200).json({ code: 1, error: "Username, email or password is undefined!" });
});

router.post('/login', (req, res) => {
    let { username, password } = req.body;
    if (!helper.isAnyUndefined(username, password)) {
        if (db.loginAccount(username, password)) {
            req.session.regenerate(function () {
                req.session.username = username;
                req.session.save(() => { });

                res.status(200).json({ code: 0, message: "You have been logged in!" });
            });
        } else res.status(200).json({ code: 1, error: "Username or password is incorrect." });
    } else res.status(200).json({ code: 2, error: "Username of password is undefined" });
});

router.get('/logout', (req, res) => {
    req.session.destroy(() => { });

    res.status(200).json({ code: 0, message: "You have been logged out." });
});

module.exports = router;