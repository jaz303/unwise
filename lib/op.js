var T   = require('./ast/types'),
    A   = require('./ast');

var UNITS = {
    'in'    : 0,
    'cm'    : 1,
    'pc'    : 2,
    'mm'    : 3,
    'pt'    : 4,
    'px'    : 5,
    'deg'   : 6,
    'rad'   : 7
};

// from libsass
var CONVERSION = [
    /*            in         cm         pc         mm         pt         px         deg          rad        */
    /* in */    [ 1,         2.54,      6,         25.4,      72,        96,        null,        null        ],
    /* cm */    [ 1.0/2.54,  1,         6.0/2.54,  10,        72.0/2.54, 96.0/2.54, null,        null        ],
    /* pc */    [ 1.0/6.0,   2.54/6.0,  1,         25.4/6.0,  72.0/6.0,  96.0/6.0,  null,        null        ],
    /* mm */    [ 1.0/25.4,  1.0/10.0,  6.0/25.4,  1,         72.0/25.4, 96.0/25.4, null,        null        ],
    /* pt */    [ 1.0/72.0,  2.54/72.0, 6.0/72.0,  25.4/72.0, 1,         96.0/72.0, null,        null        ],
    /* px */    [ 1.0/96.0,  2.54/96.0, 6.0/96.0,  25.4/96.0, 72.0/96.0, 1,         null,        null        ],
    /* deg */   [ null,      null,      null,      null,      null,      null,      1,           Math.PI/180 ],
    /* rad */   [ null,      null,      null,      null,      null,      null,      180/Math.PI, 1           ],
];

function convert(value, from, to) {
    if (from in UNITS && to in UNITS) {
        var factor = CONVERSION[UNITS[from]][UNITS[to]];
        if (factor !== null) {
            return value * factor;
        }
    }
    throw new Error("no conversion exists between " + this.unit + " and " + unit);
}

exports.add = function(left, right) {
    if (left.type === T.VALUE && left.type === T.VALUE) {
        var l = left.number,
            r = convert(right.number, right.unit, left.unit);
        return A.value(l + r, left.unit);
    } else if (typeof left === 'number' && typeof right === 'number') {
        return l + r;
    } else {
        throw new Error("invalid operand types for operator: " + v.op);
    }
}

exports.sub = function(left, right) {
    if (left.type === T.VALUE && left.type === T.VALUE) {
        var l = left.number,
            r = convert(right.number, right.unit, left.unit);
        return A.value(l - r, left.unit);
    } else if (typeof left === 'number' && typeof right === 'number') {
        return l - r;
    } else {
        throw new Error("invalid operand types for operator: " + v.op);
    }
}

exports.mul = function(left, right) {
    if (left.type === T.VALUE && typeof right === 'number') {
        return A.value(left.number * right, left.unit);
    } else if (typeof left === 'number' && right.type === T.VALUE) {
        return A.value(right.number * left, right.unit);
    } else if (typeof left === 'number' && typeof right === 'number') {
        return left * right;
    } else {
        throw new Error("invalid operand types for operator: " + v.op);
    }
}

exports.div = function(left, right) {
    if (left.type === T.VALUE && typeof right === 'number') {
        return A.value(left.number / right, left.unit);
    } else if (typeof left === 'number' && typeof right === 'number') {
        return left / right;
    } else {
        throw new Error("invalid operand types for operator: " + v.op);
    }
}

exports['+'] = exports.add;
exports['-'] = exports.sub;
exports['*'] = exports.mul;
exports['/'] = exports.div;