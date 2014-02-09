module.exports = function(op, left, right) {
    return new BinOp(op, left, right);
}

function BinOp(op, left, right) {
    this.op = op;
    this.left = left;
    this.right = right;
}

BinOp.prototype.type = require('./types').BIN_OP;