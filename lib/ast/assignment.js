var T = require('./types');

module.exports = function(variable, value) {
    return new Assignment(variable, value);
}

function Assignment(variable, value) {
    this.type = T.ASSIGNMENT;
    this.variable = variable;
    this.value = value;
}
