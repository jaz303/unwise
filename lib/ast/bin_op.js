var T = require('./types');

module.exports = function(op, left, right) {
    return new BinOp(op, left, right);
}

function BinOp(op, left, right) {
	this.type = T.BIN_OP;
    this.op = op;
    this.left = left;
    this.right = right;
}
