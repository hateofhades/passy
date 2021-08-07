const fs = require('fs');
const path = require('path');
const crypto = require('crypto-js');

function isAnyUndefined() {
    for(i in arguments) {
        if(arguments[i] === undefined) return true;
    }

    return false;
};

function isValidEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function isValidPassword(password) {
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{5,127}/;
    return re.test(String(password));
}

function isValidUsername(username) {
    const re = /^[A-Za-z][A-Za-z0-9_]{7,29}$/;
    return re.test(String(username));
}

function createUser(username, password) {
    let userDir = path.join(__dirname, `../data/accounts-data/${username}`);

    if(!fs.existsSync(userDir))
        fs.mkdirSync(userDir);
    
    fs.writeFileSync(path.join(userDir, 'passwords.json'), encrypt(JSON.stringify({ 'passwords': [] }), password));
}

function encrypt(input, encryptionKey) {
    return crypto.AES.encrypt(input, encryptionKey).toString();
}  

function decrypt(input, encryptionKey) {
    return crypto.AES.decrypt(input, encryptionKey).toString(crypto.enc.Utf8);
}

function addPassword(username, password, encryptionKey) {
    if(fs.existsSync(path.join(__dirname, `../data/accounts-data/${username}/passwords.json`))) {
        let json = JSON.parse(decrypt(fs.readFileSync(path.join(__dirname, `../data/accounts-data/${username}/passwords.json`), 'utf-8'), encryptionKey));
        json.passwords.push(password);
        fs.writeFileSync(path.join(__dirname, `../data/accounts-data/${username}/passwords.json`), encrypt(JSON.stringify(json), encryptionKey));
    } else {
        createUser(username, encryptionKey);
        addPassword(username, password, encryptionKey);
    }
}

function getPasswords(username, encryptionKey) {
    if(fs.existsSync(path.join(__dirname, `../data/accounts-data/${username}/passwords.json`))) {
        return JSON.parse(decrypt(fs.readFileSync(path.join(__dirname, `../data/accounts-data/${username}/passwords.json`), 'utf-8'), encryptionKey));
    } else {
        createUser(username, encryptionKey);
        return getPasswords(username, encryptionKey);
    }
}

module.exports = {
    isAnyUndefined: isAnyUndefined,
    isValidEmail: isValidEmail,
    isValidPassword: isValidPassword,
    isValidUsername: isValidUsername,
    createUser: createUser,
    addPassword: addPassword,
    getPasswords: getPasswords
};