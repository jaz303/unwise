var T = require('./types');

module.exports = function(name) {
    return new Variable(name);
}

function Variable(name) {
	this.type = T.VARIABLE;
    this.name = name;
}
