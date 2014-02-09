module.exports = function(number, unit) {
	return new Value(number, unit);
}

function Value(number, unit) {
	this.number = number;
	this.unit = unit;
}

Value.prototype.type = require('./types').VALUE;

Value.prototype.toString = function() {
	return '' + this.number + this.unit;
}