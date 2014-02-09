PARSER 		:= lib/parser.js
GRAMMAR 	:= lib/grammar.peg

.PHONY: all clean

all: $(PARSER)

clean:
	rm -f $(PARSER)

$(PARSER): $(GRAMMAR)
	./node_modules/.bin/pegjs -o speed $(GRAMMAR) $@