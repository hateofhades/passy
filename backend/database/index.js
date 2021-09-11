const Database = require('better-sqlite3');
const db = new Database('./database/database.db');

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
    }
};

module.exports = database;