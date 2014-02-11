var T = require('./types');

module.exports = function(rules) {
    return new Rules(rules);
}

function Rules(rules) {
	this.type = T.RULES;
    this.body = rules;
}
