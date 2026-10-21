// deno-fmt-ignore-file
import { Evaluate, IsObject, Options } from '../../type/index.mjs';
import { Guard } from '../../guard/index.mjs';
import { FromType } from './from-type.mjs';
// ------------------------------------------------------------------
// EvaluateIntersection
// ------------------------------------------------------------------
function EvaluateIntersection(type) {
    // Note: reinterpret unevaluatedProperties as additionalProperties
    const additionalProperties = Guard.HasPropertyKey(type, 'unevaluatedProperties')
        ? { additionalProperties: type.unevaluatedProperties }
        : {};
    const evaluated = Evaluate(type);
    return IsObject(evaluated)
        ? Options(evaluated, additionalProperties)
        : evaluated;
}
// ------------------------------------------------------------------
// FromIntersection
// ------------------------------------------------------------------
export function FromIntersect(context, type, value) {
    // Note: Evaluate and route back to FromType in evaluated form (likely an Object)
    const evaluated = EvaluateIntersection(type);
    return FromType(context, evaluated, value);
}
