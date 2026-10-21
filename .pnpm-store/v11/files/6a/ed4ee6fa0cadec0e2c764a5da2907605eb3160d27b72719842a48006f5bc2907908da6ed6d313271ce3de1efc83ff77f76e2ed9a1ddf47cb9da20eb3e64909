/**
 * Parse a path string (with optional bracket notation) into an array of path segments.
 * Supports both dot notation (a.b.c) and bracket notation (a[0].b, a["key"])
 */
function parsePath(path) {
    if (path === '') {
        return [''];
    }
    const segments = [];
    let current = '';
    let i = 0;
    while (i < path.length) {
        const char = path[i];
        if (char === '.') {
            if (current) {
                segments.push(current);
                current = '';
            }
            i++;
            continue;
        }
        if (char === '[') {
            if (current) {
                segments.push(current);
                current = '';
            }
            i++;
            // Check for quoted key
            if (path[i] === '"' || path[i] === "'") {
                const quote = path[i];
                i++;
                let key = '';
                while (i < path.length && path[i] !== quote) {
                    key += path[i];
                    i++;
                }
                segments.push(key);
                i += 2; // skip closing quote and opening bracket
                continue;
            }
            // Numeric index
            let index = '';
            while (i < path.length && path[i] !== ']') {
                index += path[i];
                i++;
            }
            segments.push(parseInt(index, 10));
            i++; // skip closing bracket
            continue;
        }
        current += char;
        i++;
    }
    if (current) {
        segments.push(current);
    }
    return segments;
}
/**
 * See: https://github.com/angus-c/just/blob/d8c5dd18941062d8db7e9310ecc8f53fd607df54/packages/object-safe-get/index.mjs#L33C1-L61C2
 */
export function get(obj, propsArg, defaultValue) {
    if (!obj) {
        return defaultValue;
    }
    let props;
    if (Array.isArray(propsArg)) {
        props = propsArg.slice(0);
    }
    else if (typeof propsArg === 'string') {
        props = parsePath(propsArg);
    }
    else if (typeof propsArg === 'symbol') {
        props = [propsArg];
    }
    else if (typeof propsArg === 'number') {
        props = [propsArg];
    }
    else {
        throw new Error('props arg must be an array, a string, a number or a symbol');
    }
    let result = obj;
    while (props.length) {
        const prop = props.shift();
        if (!result) {
            return defaultValue;
        }
        result = result[prop];
        if (result === undefined) {
            return defaultValue;
        }
    }
    return result;
}
