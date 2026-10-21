// deno-fmt-ignore-file
import { Deferred } from '../types/deferred.mjs';
import { Instantiate } from '../engine/instantiate.mjs';
/** Creates a deferred InstanceType action. */
export function InstanceTypeDeferred(type, options = {}) {
    return Deferred('InstanceType', [type], options);
}
/** Applies a InstanceType action to the given type. */
export function InstanceType(type, options = {}) {
    return Instantiate({}, InstanceTypeDeferred(type, options));
}
