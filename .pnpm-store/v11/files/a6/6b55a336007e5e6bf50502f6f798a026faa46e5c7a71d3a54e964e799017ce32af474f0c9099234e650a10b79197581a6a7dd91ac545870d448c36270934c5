// deno-fmt-ignore-file
import { Deferred } from '../types/deferred.mjs';
import { Instantiate } from '../engine/instantiate.mjs';
/** Creates a deferred ReturnType action. */
export function ReturnTypeDeferred(type, options = {}) {
    return Deferred('ReturnType', [type], options);
}
/** Applies a ReturnType action to the given type. */
export function ReturnType(type, options = {}) {
    return Instantiate({}, ReturnTypeDeferred(type, options));
}
