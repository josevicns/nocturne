// deno-fmt-ignore-file
import { Deferred } from '../types/deferred.mjs';
import { Instantiate } from '../engine/instantiate.mjs';
/** Creates a deferred KeyOf action. */
export function KeyOfDeferred(type, options = {}) {
    return Deferred('KeyOf', [type], options);
}
/** Applies a KeyOf action to the given type. */
export function KeyOf(type, options = {}) {
    return Instantiate({}, KeyOfDeferred(type, options));
}
