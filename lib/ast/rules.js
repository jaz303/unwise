module.exports = function(rules) {
	return new Rules(rules);
}

function Rules(rules) {
	this.body = rules;
}

Rules.prototype.type = require('./types').RULES;
