const express = require('express');
const cors = require('cors');
const fs = require('fs');
const sessions = require('express-session');
const sqlite = require('better-sqlite3');
const SqliteStore = require('better-sqlite3-session-store')(sessions);

const app = express();
const PORT = 6942;

if (!fs.existsSync('./database/database_data'))
    fs.mkdirSync('./database/database_data');
if (!fs.existsSync('./database/database_data/user_data'))
    fs.mkdirSync('./database/database_data/user_data');

const database = require('./database');
const storeDatabase = new sqlite("./database/database_data/sessions.db");
database.load();

app.use(express.json());
app.use(cors({
    credentials: true,
    origin: '*'
}));
app.use(sessions({
    store: new SqliteStore({
        client: storeDatabase,
        expired: {
            clear: true,
            intervalMs: 900000 //ms = 15 min
        }
    }),
    secret: 'Not secret yet',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 * 24 }
}));

app.use('/', require('./api.js'));

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});