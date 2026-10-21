import { get } from '@layerstack/utils';
export function accessor(prop) {
    if (Array.isArray(prop)) {
        return (d) => prop.map((p) => accessor(p)(d));
    }
    else if (typeof prop === 'function') {
        // function
        return prop;
    }
    else if (typeof prop === 'string' || typeof prop === 'number') {
        // path string or number (array index)
        return (d) => get(d, prop);
    }
    else {
        // return full object
        return (d) => d;
    }
}
/** Guarantee chart data is an array */
export function chartDataArray(data) {
    if (data == null) {
        return [];
    }
    else if (Array.isArray(data)) {
        return data;
    }
    else if ('nodes' in data) {
        return data.nodes;
    }
    else if ('descendants' in data) {
        return data.descendants();
    }
    return [];
}
export function defaultChartPadding(options = {}) {
    const { axis = true, legend = false, top, left, bottom, right } = options;
    if (axis === false) {
        return undefined;
    }
    return {
        top: top ?? (axis === true || axis === 'y' ? 4 : 0),
        left: left ?? (axis === true || axis === 'y' ? 20 : 0),
        bottom: (bottom ?? (axis === true || axis === 'x' ? 20 : 0)) + (legend ? 32 : 0),
        right: right ?? (axis === true || axis === 'x' ? 4 : 0),
    };
}
/**
 * Find the first instance within `data` with the same value as `original` using prop accessor.
 * Handles complex objects such as `Date` by invoking `.valueOf()`
 */
export function findRelatedData(data, original, accessor) {
    if (data.includes(original)) {
        return original;
    }
    return data.find((d) => {
        return accessor(d)?.valueOf() === accessor(original)?.valueOf();
    });
}
/**
 * Return the object if the value is an object, otherwise return null.
 * Functions (including Snippet types) are treated as non-objects and return null.
 */
export function getObjectOrNull(value) {
    if (typeof value === 'object')
        return value;
    if (value === undefined)
        return undefined;
    return null;
}
/**
 * Call with args if function, otherwise return the value.
 */
export function resolveMaybeFn(value, ...args) {
    return typeof value === 'function' ? value(...args) : value;
}
