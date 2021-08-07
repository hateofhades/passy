const express = require('express');
const sessions = require('express-session');
const cookieParser = require("cookie-parser");
const fs = require('fs');
const path = require('path');

if(!fs.existsSync(path.join(__dirname, '/data'))) fs.mkdirSync(path.join(__dirname, 'data/accounts-data'), {recursive: true});
else if(!fs.existsSync(path.join(__dirname, '/data/accounts-data'))) fs.mkdirSync(path.join(__dirname, 'data/accounts-data'));

require('./helpers/database.js');

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(cookieParser());
app.use(sessions({
    secret: 'NOT YET SECRET!!!',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 * 24 } //Saving the cookie for 24 hours
}));
app.use('/', require('./api.js'));

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});