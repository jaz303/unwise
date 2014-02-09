var ast = require('./lib/ast');

var p1 = ast.pair('margin', [
	ast.value(10, 'px'),
	ast.value(20, 'px'),
	ast.value(30, 'px'),
	ast.value(40, 'px')
]);

var p2 = ast.pair('padding', [
	ast.binOp('*', 1.5, ast.binOp('+', ast.value(10, 'px'), ast.value(30, 'px'))),
	ast.value(10, 'px'),
	ast.value(20, 'px'),
	ast.value(30, 'px')
]);

var r1 = ast.rule('&.foo', [
	p1,
	p2
]);

var r2 = ast.rule('body', [
	r1
]);

var rules = ast.rules([r2]);

console.log(require('./lib/emitter')(rules));
