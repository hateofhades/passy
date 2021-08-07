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

module.exports = {
    isAnyUndefined: isAnyUndefined,
    isValidEmail: isValidEmail,
    isValidPassword: isValidPassword,
    isValidUsername: isValidUsername
};