/**
 * See: https://github.com/angus-c/just/blob/d8c5dd18941062d8db7e9310ecc8f53fd607df54/packages/object-safe-set/index.mjs#L22C2-L61C2
 */
function prototypeCheck(prop) {
    // coercion is intentional to catch prop values like `['__proto__']`
    if (prop == '__proto__' || prop == 'constructor' || prop == 'prototype') {
        throw new Error('setting of prototype values not supported');
    }
}
export function set(obj, propsArg, value) {
    let props;
    if (Array.isArray(propsArg)) {
        props = propsArg.slice(0);
    }
    else if (typeof propsArg === 'string') {
        props = propsArg.split('.');
    }
    else if (typeof propsArg === 'symbol') {
        props = [propsArg];
    }
    else {
        throw new Error('props arg must be an array, a string or a symbol');
    }
    const lastProp = props.pop();
    if (lastProp === undefined) {
        return false;
    }
    prototypeCheck(lastProp);
    let thisProp;
    while ((thisProp = props.shift()) !== undefined) {
        prototypeCheck(thisProp);
        if (typeof obj[thisProp] === 'undefined') {
            obj[thisProp] = {};
        }
        obj = obj[thisProp];
        if (!obj || typeof obj !== 'object') {
            return false;
        }
    }
    obj[lastProp] = value;
    return true;
}
