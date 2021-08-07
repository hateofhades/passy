const helper = require('../helpers/helper.js');
const database = require('../helpers/database.js');

const express = require('express');
const router = express.Router();

router.post('/register', (req, res) => {
    let { password, username, email } = req.body;
    
    if(!helper.isAnyUndefined(password, username, email)) {
        if(helper.isValidEmail(email)) {
            if(password.length >= 6) {
                if(helper.isValidPassword(password)) {
                    if(username.length > 3 && username.length <= 30) {
                        if(helper.isValidUsername(username)) {
                            if(!database.userExists(username)) {
                                let registered = database.registerAccount(password, username, email);

                                if(registered) {
                                    helper.createUser(username, password);
                                    res.status(200).json({ 'message': `Account '${username}' has been registered. Please log in now.` });
                                }
                                else res.status(500).json({ 'error': 'Something went wrong. Try again.' });

                            } else res.status(400).json({ 'error': 'User is already registered. Please try another username.' });
                        } else res.status(400).json({ 'error': 'The username needs to start with a letter and can only contain alphanumeric characters or underscore.' });
                    } else res.status(400).json({ 'error': 'The username needs to be at least 8 characters and a maximum of 30 characters.' });
                } else res.status(400).json({ 'error': 'The password needs at least one uppercase, one lowercase letter, one number and one special character' });
            } else res.status(400).json({ 'error': 'Password length needs to be at least 6 characters and a maximum of 128 characters.' });
        } else res.status(400).json({ 'error': 'Invalid email.' });
    } else res.status(400).json({ 'error': 'Password, username or email is undefined.' });
});

router.post('/login', (req, res) => {
    let { password, username } = req.body;
    if(!helper.isAnyUndefined(password, username)) {
        if(database.login(username, password)) {
            req.session.regenerate(function() {
                req.session.username = username;
                req.session.encryptionKey = password;
                
                res.status(200).json({ 'message': 'You have been logged in.' });
            });
        } else res.status(400).json({ 'error': 'Invalid username or password.' });
    } else res.status(400).json({ 'error': 'Password or username is undefined.' }); 
});

router.get('/logout', (req, res) => {
    req.session.destroy();

    res.status(200).json({ 'message': 'You have been logged out.' });
});

module.exports = router;