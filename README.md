# unwise

Another bloody CSS preprocessor. I tried my best to avoid writing this but needs must.

It's just an AST-walker at the moment (no parser) but it can handle nested rules, pattern-matched function calls and variables. Just to add mixins and a parser then it will be usable.

## Why?

`unwise` is designed for runtime CSS generation, embedded in an application. Furthermore, it will eventually export a dependency graph of all variables so live-updates are possible.