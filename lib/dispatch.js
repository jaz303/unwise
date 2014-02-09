var slice   = Array.prototype.slice,
    T       = require('./ast/types');

function type(thing) {
    if (typeof thing === 'number' || typeof thing === 'string') {
        return typeof thing;
    } else if (thing && thing.type) {
        return thing.type;
    } else {
        throw new Error("unknown argument type. note: null/undefined are completely and utterly invalid!");
    }
}

module.exports = function() {
    var cases = slice.call(arguments, 0);

    // if odd number of cases insert null, catch-all condition before end
    if (cases.length & 1) {
        cases.splice(cases.length - 1, 0, null);
    }

    var ncases = cases.length;
    
    return function(env, args) {

        var argTypes    = args.map(type),
            splatted    = [env].concat(args);

        for (var i = 0; i < ncases; i += 2) {
            if (cases[i] === null) {
                return cases[i+1].apply(null, splatted);
            } else if (cases[i].length === args.length) {
                var match = true;
                for (var j = 0; j < argTypes.length; ++j) {
                    if (!cases[i][j].match(argTypes[j])) {
                        match = false;
                        break;
                    }
                }
                if (match) {
                    return cases[i+1].apply(null, splatted)
                }
            } else {
                // do nothing
            }
        }

        throw new Error("pattern match failed");
    
    }
}