// deno-fmt-ignore-file
import { Guard } from '../../../guard/index.mjs';
import { IsSchema } from '../../types/schema.mjs';
import { IsAny } from '../../types/any.mjs';
import { Never } from '../../types/never.mjs';
import { IsObject } from '../../types/object.mjs';
import { Union } from '../../types/union.mjs';
import { Compare, ResultRightInside, ResultLeftInside, ResultEqual } from './compare.mjs';
import { Flatten } from './flatten.mjs';
import { EvaluateType } from './evaluate.mjs';
function BroadFilter(type, types) {
    return types.filter(left => {
        return Compare(type, left) === ResultRightInside
            ? false
            : true;
    });
}
function IsBroadestType(type, types) {
    const result = types.some(left => {
        const result = Compare(type, left);
        return Guard.IsEqual(result, ResultLeftInside) || Guard.IsEqual(result, ResultEqual);
    });
    return Guard.IsEqual(result, false);
}
function BroadenType(type, types) {
    const evaluated = EvaluateType(type);
    return (IsAny(evaluated) ? [evaluated] :
        IsBroadestType(evaluated, types)
            ? [...BroadFilter(evaluated, types), evaluated]
            : types);
}
function BroadenTypes(types, result = []) {
    const [left, ...right] = types;
    return (IsSchema(left)
        ? IsObject(left)
            ? BroadenTypes(right, [...result, left]) // special: push object type
            : BroadenTypes(right, BroadenType(left, result))
        : result);
}
/** Broadens a set of types and returns either the most broad type, or union or disjoint types. */
export function Broaden(types) {
    const broadened = BroadenTypes(types);
    const flattened = Flatten(broadened);
    const result = (flattened.length === 0 ? Never() :
        flattened.length === 1 ? flattened[0] :
            Union(flattened));
    return result;
}
