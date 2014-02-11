var T = require('./types');

module.exports = function(selector) {
    return new Selector(selector);
}

function Selector(selector) {
	this.type = T.SELECTOR;
    this.selector = selector;
}
