const Database = require('better-sqlite3');
const bcrypt = require('bcrypt');
const db = new Database('./database/database.db');
const saltRounds = 10;

function createTables() {
    //Create the accounts table if it doesnt exist.
    db.exec(`
        CREATE TABLE IF NOT EXISTS accounts (
            id INTEGER PRIMARY KEY,
            username TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL,
            email TEXT NOT NULL
        );`
    );
}

const database = {
    load() {
        console.log("Loading database...");
        createTables();
    },

    registerAccount(username, email, password) {
        const salt = bcrypt.genSaltSync(saltRounds);
        const hash = bcrypt.hashSync(password, salt);

        const sql = db.prepare('INSERT INTO accounts (username, password, email) VALUES (?, ?, ?)');

        let info;

        try {
            info = sql.run(username, hash, email);
        } catch (error) {
            info = { 'changes': 0 };
        }

        return info.changes == 1;
    }
};

module.exports = database;