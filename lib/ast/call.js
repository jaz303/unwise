module.exports = function(fn, args) {
    return new Call(fn, args);
}

function Call(fn, args) {
    this.fn = fn;
    this.args = args;
}

Call.prototype.type = require('./types').CALL;