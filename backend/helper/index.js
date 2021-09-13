const helper = {
    isAnyUndefined() {
        for (i in arguments) {
            if (arguments[i] === undefined) return true;
        }

        return false;
    }
};

module.exports = helper;