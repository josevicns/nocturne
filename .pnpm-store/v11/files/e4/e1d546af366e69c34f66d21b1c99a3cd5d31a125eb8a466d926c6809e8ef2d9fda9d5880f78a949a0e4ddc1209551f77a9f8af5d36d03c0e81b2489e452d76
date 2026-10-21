// deno-fmt-ignore-file
import { Memory } from '../../system/memory/index.mjs';
import { IsKind } from './schema.mjs';
import { RequiredArray } from './properties.mjs';
// ------------------------------------------------------------------
// Factory
// ------------------------------------------------------------------
/** Creates an Object type. */
function _Object_(properties, options = {}) {
    const requiredKeys = RequiredArray(properties);
    const required = requiredKeys.length > 0 ? { required: requiredKeys } : {};
    return Memory.Create({ '~kind': 'Object' }, { type: 'object', ...required, properties }, options);
}
/** `[Json]` Creates an Object type */
export var Object = _Object_; // Required for CommonJS ES Interop
// ------------------------------------------------------------------
// Guard
// ------------------------------------------------------------------
/** Returns true if the given value is TObject. */
export function IsObject(value) {
    return IsKind(value, 'Object');
}
// ------------------------------------------------------------------
// Options
// ------------------------------------------------------------------
/** Extracts options from a TObject. */
export function ObjectOptions(type) {
    return Memory.Discard(type, ['~kind', 'type', 'properties', 'required']);
}
