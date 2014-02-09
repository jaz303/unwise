var T   = require('./ast/types'),
    A   = require('./ast'),
    E   = require('./env');

var OPS = {
    '+': function(l, r) { return l + r; },
    '-': function(l, r) { return l - r; },
    '*': function(l, r) { return l * r; },
    '/': function(l, r) { return l / r; }
};

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

module.exports = function(env, rules) {

    var buffer      = '',
        selectors   = [],
        lastPath    = null;

    function ruleset(rs) {
        rs.body.forEach(function(i) {
            if (i.type === T.RULE) {
                rule(i);
            }
        });
    }

    function rule(r) {

        selectors.push(r.selector);

        r.body.forEach(function(v) {
            if (v.type === T.RULE) {
                rule(v);
            } else if (v.type === T.PAIR) {
                pair(v);
            } else {
                throw new Error('bork');
            }
        });

        selectors.pop();

    }

    function pair(p) {

        var path = selectors.join(' ').trim()
                                      .replace(/\s+/g, ' ')
                                      .replace(/ \&/g, '');

        if (path !== lastPath) {
            if (lastPath !== null) {
                buffer += "}\n";
            }
            buffer += path + " {\n";
            lastPath = path;
        }

        buffer += "  " + p.key + ":";

        p.values.forEach(function(v) {
            buffer += " " + evaluate(env, v).toString();
        });

        buffer += ";\n";

    }

    function value(v) {
        if (v.type === T.VALUE) {
            return v.toString();
        } else {
            return '' + v;
        }
    }

    function evaluate(env, v) {
        
        if (typeof v === 'number' || typeof v === 'string') {

            return v;

        } else if (v.type === T.VALUE) {
        
            return v;
        
        } else if (v.type === T.BIN_OP) {
            
            var left    = evaluate(env, v.left),
                right   = evaluate(env, v.right);

            if (v.op === '*' || v.op === '/') {
                if (left.type === T.VALUE && typeof right === 'number') {
                    return A.value(left.number * right, left.unit);
                } else if (typeof left === 'number' && right.type === T.VALUE) {
                    return A.value(right.number * left, right.unit);
                } else {
                    throw new Error("invalid operand types for operator: " + v.op);
                }
            } else if (v.op === '+' || v.op === '-') {
                if (left.type === T.VALUE && left.type === T.VALUE) {
                    var l = left.number,
                        r = convert(right.number, right.unit, left.unit);
                    return A.value(OPS[v.op](l, r), left.unit);
                } else if (typeof left === 'number' && typeof right === 'number') {
                    return OPS[v.op](left, right);
                } else {
                    throw new Error("invalid operand types for operator: " + v.op);
                }
            }

        } else if (v.type === T.CALL) {

            var fn = E.get(env, v.fn);
            if (typeof fn !== 'function') {
                throw new Error("type error: '" + v.fn + "' is not a function");
            }

            return fn(env, v.args.map(function(arg) {
                return evaluate(env, arg);
            }));

        } else if (v.type === T.VARIABLE) {

            return evaluate(env, E.get(env, v.name));

        } else {

            throw new Error("uhandled type in evaluate(): " + v.type + " (this is probably a bug)");

        }
        
    }

    ruleset(rules);

    if (lastPath) {
        buffer += "}\n";
    }

    return buffer;

}