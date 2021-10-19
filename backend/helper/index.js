const fs = require('fs-extra');
const path = require('path');
const crypto = require('crypto-js');

const helper = {
    isAnyUndefined() {
        for (i in arguments) {
            if (arguments[i] === undefined) return true;
        }

        return false;
    },

    createUserData(username, encryptKey) {
        const userDir = path.join(__dirname, `../database/database_data/user_data/${username}`);
        if (fs.existsSync(userDir))
            fs.removeSync(userDir);
        fs.mkdirSync(userDir);

        fs.writeFileSync(`${userDir}/logins.json`, encrypt(JSON.stringify({ 'passwords': [] }), encryptKey));
    },

    addPassword(username, encryptKey, name, account, password, website) {
        const userDir = path.join(__dirname, `../database/database_data/user_data/${username}`);
        if (!fs.existsSync(userDir))
            this.createUserData(username, encryptKey);
        if (!fs.existsSync(`${userDir}/logins.json`))
            fs.writeFileSync(`${userDir}/logins.json`, encrypt(JSON.stringify({ 'passwords': [] }), encryptKey));

        let json = JSON.parse(decrypt(fs.readFileSync(`${userDir}/logins.json`, 'utf-8'), encryptKey));

        json.passwords.push({
            id: json.passwords.length,
            title: name,
            account: account,
            password: password,
            website: website
        });

        fs.writeFileSync(`${userDir}/logins.json`, encrypt(JSON.stringify(json), encryptKey));
    },

    getPasswords(username, encryptKey) {
        const userDir = path.join(__dirname, `../database/database_data/user_data/${username}`);
        if (!fs.existsSync(userDir))
            this.createUserData(username, encryptKey);
        if (!fs.existsSync(`${userDir}/logins.json`))
            fs.writeFileSync(`${userDir}/logins.json`, encrypt(JSON.stringify({ 'passwords': [] }), encryptKey));

        let json = JSON.parse(decrypt(fs.readFileSync(`${userDir}/logins.json`, 'utf-8'), encryptKey));

        return json.passwords;
    }
};

function encrypt(input, key) {
    return crypto.AES.encrypt(input, key).toString();
}

function decrypt(input, key) {
    return crypto.AES.decrypt(input, key).toString(crypto.enc.Utf8);
}

module.exports = helper;