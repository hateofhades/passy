const helper = require('../helpers/helper.js');

const express = require('express');
const router = express.Router();

/**
 * @swagger
 * tags:
 *  name: Passwords
 *  description: The password manager API.
 * */

/**
 * @swagger
 * components:
 *  schemas:
 *      Vault Password:
 *          type: object
 *          required:
 *            - site
 *            - username
 *            - password
 *          properties:
 *              site:
 *                  type: string
 *                  description: The Website Login URL for this account.
 *              username:
 *                  type: string
 *                  description: The Username/Email to log into this account.
 *              password:
 *                  type: string
 *                  description: The Password to log into this account.
 *          example:
 *              site: https://www.cool-website.com/login.php
 *              username: coolusername-not-fake
 *              password: coolestpasswordEVER
 *          
 * */

/**
 * @swagger
 * /v1/passwords/get:
 *  get:
 *      summary: Gets all the passwords from the secure vault.
 *      tags: [Passwords]
 *      responses:
 *          200:
 *              description: Successfully got all the passwords from the vault.
 *              content:
 *                  application/json:
 *                      description: An array with all the passwords stored.
 *                      schema:
 *                          type: object
 *                          properties:
 *                              passwords:
 *                                  type: array
 *                                  items:
 *                                      $ref: '#/components/schemas/Vault Password'                                   
 *          401:
 *              description: Not logged in.
 *              
 * */
router.get('/get', (req, res) => {
    if(!(req.session.username === undefined)) {
        res.status(200).json(JSON.stringify(helper.getPasswords(req.session.username, req.session.encryptionKey)));
    } else res.status(401).json({ 'error': 'Not logged in.' });
});

/**
 * @swagger
 * /v1/passwords/add:
 *  post:
 *      summary: Add a new password to the secure vault.
 *      tags: [Passwords]
 *      consumes:
 *        - application/json
 *      requestBody:
 *          content:
 *              application/json:
 *                  description: All the options to the new password to be added.
 *                  schema:
 *                      type: object
 *                      required:
 *                        - site
 *                        - username
 *                        - password
 *                      properties:
 *                          site:
 *                              type: string
 *                          username:
 *                              type: string
 *                          password:
 *                              type: string
 *                      
 *      responses:
 *          201:
 *              description: Successfully added a new password to the vault.
 *          400:
 *              description: Parameters missing.
 *          401:
 *              description: Not logged in.
 *              
 * */
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
            res.status(201).json({ 'message': 'Password added.' });
        } else res.status(400).json({ 'error': 'Missing parameters.' });
    } else res.status(401).json({ 'error': 'Not logged in.' });
});


/**
 * @swagger
 * /v1/passwords/generate:
 *  post:
 *      summary: Generate a random secure password.
 *      tags: [Passwords]
 *      consumes:
 *        - application/json
 *      requestBody:
 *          content:
 *              application/json:
 *                  description: Options to generate a new password.
 *                  schema:
 *                      type: object
 *                      required:
 *                        - length
 *                        - upperChar
 *                        - lowerChar
 *                        - numericChar
 *                        - specialChar
 *                      properties:
 *                          length:
 *                              type: integer
 *                          upperChar:
 *                              type: boolean
 *                          lowerChar:
 *                              type: boolean
 *                          numericChar:
 *                              type: boolean
 *                          specialChar:
 *                              type: boolean
 *                      example:
 *                          length: 16
 *                          upperChar: true
 *                          lowerChar: true
 *                          numericChar: false
 *                          specialChar: true
 *      responses:
 *          201:
 *              description: Successfully generated a new password.
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              password:
 *                                  type: string
 *          400:
 *              description: Parameters missing.
 * */
router.post('/generate', (req, res) => {
    let { length, upperChar, lowerChar, numericChar, specialChar } = req.body; 

    if(!helper.isAnyUndefined(length, upperChar, lowerChar, numericChar, specialChar)) {
        const password = helper.generatePassword(length, upperChar, lowerChar, numericChar, specialChar);
        res.status(201).json({ 'password': password });
    } else res.status(400).json({ 'error': 'Missing parameters.' });
});

module.exports = router;