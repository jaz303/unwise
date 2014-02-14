var ast = require('./lib/ast');

var env = require('./lib/env');

var root = env();

var T = require('./lib/ast/types');

var D = require('./lib/dispatch');

root.define('abs', D(
    ['value'], function(env, val) {
        return ast.value(Math.abs(val.number), val.unit);
    },
    ['number'], function(env, val) {
        return Math.abs(val);
    }
));

root.define('FOO', ast.value(100, 'px'));

var p1 = ast.pair('margin', [
    ast.value(10, 'px'),
    ast.value(20, 'px'),
    ast.value(30, 'px'),
    ast.value(40, 'px')
]);

var p2 = ast.pair('padding', [
    ast.call('abs', [
        ast.binOp('*',
            -1.5,
            ast.binOp('+',
                ast.value(10, 'px'),
                ast.variable('FOO')))
    ]),
    ast.value(10, 'px'),
    ast.value(20, 'px'),
    ast.value(30, 'px')
]);

var p3 = ast.pair('background-color', ['#ff0000']);

var r1 = ast.rule('&.foo', [
    p1,
    p2
]);

var r2 = ast.rule('body', [
    r1,
    p3
]);

var rules = ast.rules([r2]);

console.log(require('./lib/emitter')(root, rules));
