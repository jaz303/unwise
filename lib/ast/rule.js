var T = require('./types');

module.exports = function(selector, inner) {
    return new Rule(selector, inner)
}

function Rule(selector, body) {
	this.type = T.RULE;
    this.selector = selector;
    this.body = body;
}
