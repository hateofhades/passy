const express = require('express');
const router = express.Router();
const db = require('../database');
const helper = require('../helper');

router.post("/add", (req, res) => {
    if (!!req.session.username) {
        let { encryptionKey, name, account, password, website } = req.body;
        if (!helper.isAnyUndefined(encryptionKey, name, account, password)) {
            if (db.loginAccount(req.session.username, encryptionKey)) {
                helper.addPassword(req.session.username, encryptionKey, name, account, password, website);
                res.status(200).json({ code: 0, message: "Added!" });
            } else res.status(200).json({ code: 3, message: "Something went wrong..." });
        } else res.status(200).json({ code: 2, message: "Name, account or password is undefined!" });
    } else res.status(200).json({ code: 1, message: "Please log in!" });
});

router.post("/get", (req, res) => {
    if (!!req.session.username) {
        let { encryptionKey } = req.body;
        if (!helper.isAnyUndefined(encryptionKey)) {
            if (db.loginAccount(req.session.username, encryptionKey)) {
                res.status(200).json({ code: 0, passwords: helper.getPasswords(req.session.username, encryptionKey) });
            } else res.status(200).json({ code: 2, message: "Something went wrong..." });
        } else res.status(200).json({ code: 2, message: "Something went wrong..." });
    } else res.status(200).json({ code: 1, message: "Please log in!" });
});

module.exports = router;