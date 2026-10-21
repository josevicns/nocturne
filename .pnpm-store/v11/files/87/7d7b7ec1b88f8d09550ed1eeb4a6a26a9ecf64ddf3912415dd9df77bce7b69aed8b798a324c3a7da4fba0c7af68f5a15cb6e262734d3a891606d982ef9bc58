// deno-fmt-ignore-file
import { Memory } from '../../system/memory/index.mjs';
import { Guard } from '../../guard/index.mjs';
import { IsSchema } from './schema.mjs';
/** Applies a Refine check to the given type. */
export function RefineAdd(type, refinement) {
    const refinements = IsRefine(type) ? [...type['~refine'], refinement] : [refinement];
    return Memory.Update(type, { '~refine': refinements }, {});
}
/** Applies a Refine check to the given type. */
export function Refine(type, refine, message = 'error') {
    return RefineAdd(type, { refine, message });
}
// ------------------------------------------------------------------
// Guard
// ------------------------------------------------------------------
/** Returns true if the given value is a TRefine. */
export function IsRefine(value) {
    return IsSchema(value) && Guard.HasPropertyKey(value, '~refine');
}
