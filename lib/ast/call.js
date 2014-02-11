var T = require('./types');

module.exports = function(fn, args) {
    return new Call(fn, args);
}

function Call(fn, args) {
	this.type = T.CALL;
    this.fn = fn;
    this.args = args;
}
