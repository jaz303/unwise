var T = require('./types');

module.exports = function(number, unit) {
    return new Value(number, unit);
}

function Value(number, unit) {
	this.type = T.VALUE;
    this.number = number;
    this.unit = unit;
}

Value.prototype.toString = function() {
    return '' + this.number + this.unit;
}
