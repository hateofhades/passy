const express = require('express');
const cors = require('cors');
const database = require('./database');
const sessions = require('express-session');

const app = express();
const PORT = 6942;

database.load();

app.use(express.json());
app.use(cors());
app.use(sessions({
    secret: 'Not secret yet',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 * 24 }
}));

app.use('/', require('./api.js'));

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});