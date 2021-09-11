const express = require('express');
const cors = require('cors');
const database = require('./database');

const app = express();
const PORT = 6942;

database.load();

app.use(express.json());
app.use(cors());

app.use('/', require('./api.js'));

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});