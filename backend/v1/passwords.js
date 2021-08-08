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

router.post('/generate', (req, res) => {
    let { length, upperChar, lowerChar, numericChar, specialChar } = req.body; 

    if(!helper.isAnyUndefined(length, upperChar, lowerChar, numericChar, specialChar)) {
        const password = helper.generatePassword(length, upperChar, lowerChar, numericChar, specialChar);
        res.status(200).json({ 'password': password });
    } else res.status(400).json({ 'error': 'Missing parameters.' });
});

module.exports = router;