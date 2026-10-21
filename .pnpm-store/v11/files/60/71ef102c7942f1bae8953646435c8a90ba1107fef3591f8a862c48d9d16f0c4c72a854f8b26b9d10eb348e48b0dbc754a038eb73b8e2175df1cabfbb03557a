// deno-fmt-ignore-file
import { Deferred } from '../types/deferred.mjs';
import { Instantiate } from '../engine/instantiate.mjs';
/** Creates a deferred Lowercase action. */
export function LowercaseDeferred(type, options = {}) {
    return Deferred('Lowercase', [type], options);
}
/** Applies a Lowercase action to the given type. */
export function Lowercase(type, options = {}) {
    return Instantiate({}, LowercaseDeferred(type, options));
}
