// deno-fmt-ignore-file
import { Guard } from '../../guard/index.mjs';
import { FromType } from './from-type.mjs';
import { Callback } from './callback.mjs';
// ------------------------------------------------------------------
// Decode
// ------------------------------------------------------------------
function Decode(direction, context, type, value) {
    for (const schema of type.allOf) {
        value = FromType(direction, context, schema, value);
    }
    return Callback(direction, context, type, value);
}
// ------------------------------------------------------------------
// Encode
// ------------------------------------------------------------------
function Encode(direction, context, type, value) {
    let exterior = Callback(direction, context, type, value);
    for (const schema of type.allOf) {
        exterior = FromType(direction, context, schema, exterior);
    }
    return exterior;
}
export function FromIntersect(direction, context, type, value) {
    return Guard.IsEqual(direction, 'Decode')
        ? Decode(direction, context, type, value)
        : Encode(direction, context, type, value);
}
