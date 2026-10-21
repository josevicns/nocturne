// deno-fmt-ignore-file
import { Deferred } from '../types/deferred.mjs';
import { Instantiate } from '../engine/instantiate.mjs';
/** Creates a deferred NonNullable action. */
export function NonNullableDeferred(type, options = {}) {
    return Deferred('NonNullable', [type], options);
}
/** Applies a NonNullable action to the given type. */
export function NonNullable(type, options = {}) {
    return Instantiate({}, NonNullableDeferred(type, options));
}
