module.exports = function() {
    return new Env();
}

function Env(parent) {
    this.parent = parent || null;
    this.env = {};
}

Env.prototype.beget = function() {
    return new Env(this);
}

Env.prototype.find = function(key) {
    if (key in this.env) {
        return this;
    } else if (this.parent) {
        return this.parent.find(key);
    } else {
        throw new Error("can't find key: " + key);
    }
}

Env.prototype.set = function(key, value) {
    this.find(key).env[key] = value;
}

Env.prototype.define = function(key, value) {
    this.env[key] = value;
}

Env.prototype.setOrDefine = function(key, value) {
    try {
        this.set(key, value);
    } catch (e) {
        this.define(key, value);
    }
}

Env.prototype.get = function(key) {
    return this.find(key).env[key];
}