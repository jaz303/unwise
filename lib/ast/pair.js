module.exports = function(key, values) {
    return new Pair(key, values);
}

function Pair(key, values) {
    this.key = key;
    this.values = values;
}

Pair.prototype.type = require('./types').PAIR;