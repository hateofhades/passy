const helper = require('../helpers/helper.js');

const express = require('express');
const router = express.Router();

router.get('/get', (req, res) => {
    if(!(req.session.username === undefined)) {
        res.status(200).json(JSON.stringify(helper.getPasswords(req.session.username, req.session.encryptionKey)));
    } else res.status(401).json({ 'error': 'Not logged in.' });
});

router.post('/add', (req, res) => {
    if(!(req.session.username === undefined)) {
        let { site, username, password } = req.body;

        if(!helper.isAnyUndefined(site, username, password)) {
            const newPassword = {
                site: site,
                username: username,
                password: password
            };

            helper.addPassword(req.session.username, newPassword, req.session.encryptionKey);
            res.status(200).json({ 'message': 'Password added.' });
        } else res.status(400).json({ 'error': 'Missing parameters.' });
    } else res.status(401).json({ 'error': 'Not logged in.' });
});

module.exports = router;