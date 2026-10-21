// deno-fmt-ignore-file
import { Deferred } from '../types/deferred.mjs';
import { Instantiate } from '../engine/instantiate.mjs';
/** Creates a deferred Partial action. */
export function PartialDeferred(type, options = {}) {
    return Deferred('Partial', [type], options);
}
/** Applies a Partial action to the given type. */
export function Partial(type, options = {}) {
    return Instantiate({}, PartialDeferred(type, options));
}
