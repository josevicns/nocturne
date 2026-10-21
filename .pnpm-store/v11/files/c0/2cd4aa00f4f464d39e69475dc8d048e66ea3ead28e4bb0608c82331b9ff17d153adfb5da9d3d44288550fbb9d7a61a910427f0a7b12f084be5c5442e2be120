// deno-fmt-ignore-file
import { Unreachable } from '../../../system/unreachable/index.mjs';
import { Guard } from '../../../guard/index.mjs';
import { IsSchema } from '../../types/schema.mjs';
import { EvaluateUnion } from '../evaluate/evaluate.mjs';
import { FromType } from './from-type.mjs';
function CollapseUnionProperties(left, right) {
    const sharedKeys = Guard.Keys(left).filter((key) => key in right);
    const result = sharedKeys.reduce((result, key) => {
        return { ...result, [key]: EvaluateUnion([left[key], right[key]]) };
    }, {});
    return result;
}
function ReduceVariants(types, result) {
    const [left, ...right] = types;
    return (IsSchema(left)
        ? ReduceVariants(right, CollapseUnionProperties(result, FromType(left)))
        : result);
}
export function FromUnion(types) {
    const [left, ...right] = types;
    return (IsSchema(left)
        ? ReduceVariants(right, FromType(left))
        : Unreachable());
}
// deno-coverage-ignore-stop
