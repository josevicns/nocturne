// deno-fmt-ignore-file
import { Deferred } from '../types/deferred.mjs';
import { Instantiate } from '../engine/instantiate.mjs';
/** Creates a deferred ReadonlyType action. */
export function ReadonlyTypeDeferred(type, options = {}) {
    return Deferred('ReadonlyType', [type], options);
}
/** This type is an alias for the TypeScript `Readonly<T>` utility type. */
export function ReadonlyType(type, options = {}) {
    return Instantiate({}, ReadonlyTypeDeferred(type, options));
}
