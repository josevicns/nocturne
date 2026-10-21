// deno-fmt-ignore-file
// deno-fmt-ignore-file
import { Guard } from '../../../guard/index.mjs';
import { IsSchema } from '../../types/schema.mjs';
import { IsIntersect } from '../../types/intersect.mjs';
import { IsUnion } from '../../types/union.mjs';
import { IsObject } from '../../types/object.mjs';
import { IsTuple } from '../../types/tuple.mjs';
import { Composite } from './composite.mjs';
import { Narrow } from './narrow.mjs';
import { EvaluateType } from "./evaluate.mjs";
import { EvaluateIntersect } from "./evaluate.mjs";
function CanDistribute(type) {
    return IsObject(type) || IsTuple(type);
}
function DistributeNormalize(type) {
    return (IsIntersect(type)
        ? EvaluateIntersect(type.allOf)
        : type);
}
function DistributeOperation(left, right) {
    const normalLeft = DistributeNormalize(left);
    const normalRight = DistributeNormalize(right);
    const isObjectLeft = CanDistribute(normalLeft);
    const IsObjectRight = CanDistribute(normalRight);
    const result = (isObjectLeft && IsObjectRight ? Composite(EvaluateType(normalLeft), normalRight) :
        isObjectLeft && !IsObjectRight ? EvaluateType(normalLeft) :
            !isObjectLeft && IsObjectRight ? normalRight :
                Narrow(EvaluateType(normalLeft), normalRight));
    return result;
}
function DistributeType(type, types, result = []) {
    const [left, ...right] = types;
    return (!Guard.IsUndefined(left) // TSchema[]
        ? DistributeType(type, right, [...result, DistributeOperation(type, left)])
        : result.length === 0
            ? [type]
            : result);
}
function DistributeUnion(types, distribution, result = []) {
    const [left, ...right] = types;
    return (IsSchema(left)
        ? DistributeUnion(right, distribution, [...result, ...Distribute([left], distribution)])
        : result);
}
export function Distribute(types, result = []) {
    const [left, ...right] = types;
    return (IsSchema(left)
        ? IsUnion(left)
            ? Distribute(right, DistributeUnion(left.anyOf, result))
            : Distribute(right, DistributeType(left, result))
        : result);
}
