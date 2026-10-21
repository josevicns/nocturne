// deno-fmt-ignore-file
import { Deferred } from '../types/deferred.mjs';
import { Instantiate } from '../engine/instantiate.mjs';
/** Creates a deferred Mapped action. */
export function MappedDeferred(identifier, type, as, property, options = {}) {
    return Deferred('Mapped', [identifier, type, as, property], options);
}
/** Applies a Mapped action using the given types. */
export function Mapped(identifier, type, as, property, options = {}) {
    return Instantiate({}, MappedDeferred(identifier, type, as, property, options));
}
