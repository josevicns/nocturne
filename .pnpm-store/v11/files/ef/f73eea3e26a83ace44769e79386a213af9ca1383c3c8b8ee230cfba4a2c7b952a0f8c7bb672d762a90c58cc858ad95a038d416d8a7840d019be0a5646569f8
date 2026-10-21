// deno-fmt-ignore-file
import { IsIntersect } from '../../types/intersect.mjs';
import { IsUnion } from '../../types/union.mjs';
import { Distribute } from './distribute.mjs';
import { Broaden } from './broaden.mjs';
export function EvaluateIntersect(types) {
    const distribution = Distribute(types);
    const result = Broaden(distribution);
    return result;
}
export function EvaluateUnion(types) {
    const result = Broaden(types);
    return result;
}
export function EvaluateType(type) {
    return (IsIntersect(type) ? EvaluateIntersect(type.allOf) :
        IsUnion(type) ? EvaluateUnion(type.anyOf) :
            type);
}
