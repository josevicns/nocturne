export const invariant = (condition, msg) => {
    if (!condition) {
        throw new Error(msg);
    }
};
export const runIfFn = (value, ...args) => {
    return typeof value === 'function' ? value(...args) : value;
};
