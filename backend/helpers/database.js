const Database = require('better-sqlite3');
const bcrypt = require('bcrypt');
const db = new Database('./data/database.db');

const saltRounds = 10;

createTables();

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

function registerAccount(password, username, email) {
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt);

    const sql = db.prepare('INSERT INTO accounts (username, password, email) VALUES (?, ?, ?)');
    
    let info;

    try {
        info = sql.run(username, hash, email);
    } catch(error) {
        info = { 'changes': 0 };
    }

    return info.changes == 1;
}

function userExists(username) {
    const sql = db.prepare('SELECT * FROM accounts WHERE username = ?');
    const info = sql.get(username);

    return !(info === undefined);
}

function login(username, password) {
    const sql = db.prepare('SELECT * FROM accounts WHERE username = ?');

    let hash;
    
    try {
        hash = sql.get(username).password;
    } catch {
        return false;
    }


    return bcrypt.compareSync(password, hash);
}

module.exports = {
    registerAccount: registerAccount,
    userExists: userExists,
    login: login
};