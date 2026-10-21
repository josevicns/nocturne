// deno-fmt-ignore-file
import { Memory } from '../../system/memory/index.mjs';
import { IsKind } from './schema.mjs';
// ------------------------------------------------------------------
// Factory
// ------------------------------------------------------------------
/** Creates a Function type. */
export function Function(parameters, returnType, options = {}) {
    return Memory.Create({ ['~kind']: 'Function' }, { type: 'function', parameters, returnType }, options);
}
// ------------------------------------------------------------------
// Guard
// ------------------------------------------------------------------
/** Returns true if the given value is TFunction. */
export function IsFunction(value) {
    return IsKind(value, 'Function');
}
// ------------------------------------------------------------------
// Options
// ------------------------------------------------------------------
/** Extracts options from a TFunction. */
export function FunctionOptions(type) {
    return Memory.Discard(type, ['~kind', 'type', 'parameters', 'returnType']);
}
