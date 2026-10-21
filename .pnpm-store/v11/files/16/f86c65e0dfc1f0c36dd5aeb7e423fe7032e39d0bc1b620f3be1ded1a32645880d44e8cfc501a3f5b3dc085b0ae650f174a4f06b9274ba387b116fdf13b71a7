// deno-fmt-ignore-file
import { Deferred } from '../types/deferred.mjs';
import { Instantiate } from '../engine/instantiate.mjs';
/** Creates a deferred Options action. */
export function OptionsDeferred(type, options) {
    return Deferred('Options', [type, options], {});
}
/** Applies an Options action to the given type. */
export function Options(type, options) {
    return Instantiate({}, OptionsDeferred(type, options));
}
