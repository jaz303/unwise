module.exports = function(selector, inner) {
	return new Rule(selector, inner)
}

function Rule(selector, body) {
	this.selector = selector;
	this.body = body;
}

Rule.prototype.type = require('./types').RULE;