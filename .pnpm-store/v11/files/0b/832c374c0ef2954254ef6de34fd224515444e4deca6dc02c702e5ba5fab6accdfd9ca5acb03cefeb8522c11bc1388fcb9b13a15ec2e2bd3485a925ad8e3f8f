// deno-fmt-ignore-file
import { Deferred } from '../types/deferred.mjs';
import { Instantiate } from '../engine/instantiate.mjs';
/** Creates a deferred Uppercase action. */
export function UppercaseDeferred(type, options = {}) {
    return Deferred('Uppercase', [type], options);
}
/** Applies a Uppercase action to the given type. */
export function Uppercase(type, options = {}) {
    return Instantiate({}, UppercaseDeferred(type, options));
}
