module.exports = function(name) {
    return new Variable(name);
}

function Variable(name) {
    this.name = name;
}

Variable.prototype.type = require('./types').VARIABLE;