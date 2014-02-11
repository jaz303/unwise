var parser = require('../lib/parser'),
    source = require('fs').readFileSync(process.argv[2], {encoding: 'utf8'}),
    chunks = source.split('---'),
    T      = require('../lib/ast/types'),
    expect = eval("(" + chunks[1] + ")"),
    eq     = require('assert').deepEqual,
    ins    = require('util').inspect;

try {
    var result = parser.parse(chunks[0]);
    eq(result, expect);
} catch (e) {
    if (e.name === 'AssertionError') {
        console.log("Expected\n---------");
        console.log(ins(expect, {colors: true, depth: null}));
        console.log('');
        console.log("Actual\n------");
        console.log(ins(result, {colors: true, depth: null}));
        console.log('');
    } else {
        console.log(e); 
    }
    process.exit(1);
}