var i = 0;
function iota() { return ++i; }

module.exports = {
	BIN_OP 		: iota(),
	PAIR 		: iota(),
	RULE 		: iota(),
	RULES 		: iota(),
	SELECTOR	: iota(),
	VALUE 		: iota()
};