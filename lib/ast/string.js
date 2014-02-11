var T = require('./types');

module.exports = function(string) {
    return new Str(string);
}

function Str(string) {
	this.type = T.STRING;
    this.string = string;
}

Str.prototype.toString = function() {
	var str = this.string.replace('\\', '\\\\')
						 .replace('"', '\\"');

	return '"' + str + '"';
}