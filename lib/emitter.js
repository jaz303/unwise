var T   = require('./ast/types'),
    A   = require('./ast'),
    O   = require('./op');

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

            return O[v.op](left, right);

        } else if (v.type === T.CALL) {

            var fn = env.get(v.fn);
            if (typeof fn !== 'function') {
                throw new Error("type error: '" + v.fn + "' is not a function");
            }

            return fn(env, v.args.map(function(arg) {
                return evaluate(env, arg);
            }));

        } else if (v.type === T.VARIABLE) {

            return evaluate(env, env.get(v.name));

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