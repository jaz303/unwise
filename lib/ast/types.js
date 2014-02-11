module.exports = {
    BIN_OP      : 'bin-op',
    CALL        : 'call',
    HEX_COLOR   : 'hex-color',
    HSL_COLOR	: 'hsl-color',
    PAIR        : 'pair',
    RGB_COLOR	: 'rgb-color',
    RULE        : 'rule',
    RULES       : 'rules',
    SELECTOR    : 'selector',
    STRING      : 'string',
    VALUE       : 'value',
    VARIABLE    : 'variable',

    // following entries only exist for use in pattern matching e.g.
    // [T.COLOR], function(color) { ... }
	
	COLOR 		: /^(hex|hsl|rgb)-color$/
};
