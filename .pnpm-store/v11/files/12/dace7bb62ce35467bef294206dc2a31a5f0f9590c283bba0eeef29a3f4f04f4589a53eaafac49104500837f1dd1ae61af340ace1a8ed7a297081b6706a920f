// deno-fmt-ignore-file
// deno-lint-ignore-file 
import { Memory } from '../../system/memory/index.mjs';
import { IsKind } from './schema.mjs';
// ------------------------------------------------------------------
// Factory
// ------------------------------------------------------------------
/** Creates a Unsafe type. */
export function Unsafe(schema) {
    return Memory.Create({ ['~kind']: 'Unsafe' }, {}, schema);
}
// ------------------------------------------------------------------
// Guard
// ------------------------------------------------------------------
/** Returns true if the given value is TUnsafe. */
export function IsUnsafe(value) {
    return IsKind(value, 'Unsafe');
}
