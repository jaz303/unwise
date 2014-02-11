var T = require('./types');

module.exports = function(key, values) {
    return new Pair(key, values);
}

function Pair(key, values) {
	this.type = T.PAIR;
    this.key = key;
    this.values = values;
}
