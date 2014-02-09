module.exports = {
    create          : create,
    find            : find,
    set             : set,
    define          : define,
    setOrDefine     : setOrDefine,
    get             : get
};

function create(parent) {
    return Object.create(parent || null);
}

function find(env, key) {
    while (env) {
        if (key in env) return env;
        env = Object.getPrototypeOf(env);
    }
    throw new Error("can't find key: " + key);
}

function set(env, key, value) {
    find(env, key)[key] = value;
}

function define(env, key, value) {
    env[key] = value;
}

function setOrDefine(env, key, value) {
    try {
        set(env, key, value);
    } catch (e) {
        define(env, key, value);
    }
}

function get(env, key) {
    return find(env, key)[key];
}