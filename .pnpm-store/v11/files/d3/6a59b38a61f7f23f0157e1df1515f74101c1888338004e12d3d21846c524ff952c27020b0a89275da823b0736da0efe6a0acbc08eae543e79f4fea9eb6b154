// deno-fmt-ignore-file
import { Deferred } from '../types/deferred.mjs';
import { Instantiate } from '../engine/instantiate.mjs';
/** Creates a deferred Evaluate action. */
export function EvaluateDeferred(type, options = {}) {
    return Deferred('Evaluate', [type], options);
}
/** Applies an Evaluate action to a type. */
export function Evaluate(type, options = {}) {
    return Instantiate({}, EvaluateDeferred(type, options));
}
