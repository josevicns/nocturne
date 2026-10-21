// deno-fmt-ignore-file
import { Deferred } from '../types/deferred.mjs';
import { Instantiate } from '../engine/instantiate.mjs';
/** Creates a deferred Awaited action. */
export function AwaitedDeferred(type, options = {}) {
    return Deferred('Awaited', [type], options);
}
/** Applies an Awaited action to a type. */
export function Awaited(type, options = {}) {
    return Instantiate({}, AwaitedDeferred(type, options));
}
