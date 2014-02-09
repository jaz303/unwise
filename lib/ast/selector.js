module.exports = function(selector) {
    return new Selector(selector);
}

function Selector(selector) {
    this.selector = selector;
}

Selector.prototype.type = require('./types').SELECTOR;