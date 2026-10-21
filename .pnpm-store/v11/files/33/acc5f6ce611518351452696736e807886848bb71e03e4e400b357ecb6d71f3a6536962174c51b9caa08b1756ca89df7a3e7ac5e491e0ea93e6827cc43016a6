// deno-fmt-ignore-file
import { Deferred } from '../types/deferred.mjs';
import { Instantiate } from '../engine/instantiate.mjs';
/** Creates a deferred ConstructorParameters action. */
export function ConstructorParametersDeferred(type, options = {}) {
    return Deferred('ConstructorParameters', [type], options);
}
/** Applies a ConstructorParameters action to a type. */
export function ConstructorParameters(type, options = {}) {
    return Instantiate({}, ConstructorParametersDeferred(type, options));
}
