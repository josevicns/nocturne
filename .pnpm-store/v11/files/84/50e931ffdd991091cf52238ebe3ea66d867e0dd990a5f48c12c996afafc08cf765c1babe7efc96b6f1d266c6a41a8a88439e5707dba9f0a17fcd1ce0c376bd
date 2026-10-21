function isObject(value) {
    return typeof value === 'object' && value !== null;
}
function isPlainObject(value) {
    if (typeof value !== 'object' || value === null)
        return false;
    const proto = Object.getPrototypeOf(value);
    return proto === null || proto === Object.prototype;
}
function mergeOne(target, source, customizer) {
    if (!isObject(target) || !isObject(source))
        return target;
    for (const key in source) {
        const srcVal = source[key];
        const tgtVal = target[key];
        if (customizer) {
            const custom = customizer(tgtVal, srcVal, key);
            if (custom !== undefined) {
                target[key] = custom;
                continue;
            }
        }
        if (Array.isArray(srcVal)) {
            if (!Array.isArray(tgtVal))
                target[key] = [];
            srcVal.forEach((item, i) => {
                if (isPlainObject(item) && isPlainObject(target[key][i])) {
                    target[key][i] = mergeOne(target[key][i], item, customizer);
                }
                else {
                    target[key][i] = item;
                }
            });
        }
        else if (isPlainObject(srcVal)) {
            if (!isPlainObject(tgtVal))
                target[key] = {};
            mergeOne(target[key], srcVal, customizer);
        }
        else {
            target[key] = srcVal;
        }
    }
    return target;
}
export function mergeWith(target, ...args) {
    const last = args[args.length - 1];
    const hasCustomizer = typeof last === 'function';
    const customizer = hasCustomizer ? last : undefined;
    const sources = hasCustomizer ? args.slice(0, -1) : args;
    for (const source of sources) {
        if (source)
            mergeOne(target, source, customizer);
    }
    return target;
}
export function merge(target, ...sources) {
    for (const source of sources) {
        if (source)
            mergeOne(target, source);
    }
    return target;
}
export function defaultsDeep(target, ...sources) {
    return mergeWith(target, ...sources, (objValue, srcValue) => {
        if (objValue !== undefined) {
            if (isPlainObject(objValue) && isPlainObject(srcValue)) {
                return undefined;
            }
            return objValue;
        }
        return undefined;
    });
}
