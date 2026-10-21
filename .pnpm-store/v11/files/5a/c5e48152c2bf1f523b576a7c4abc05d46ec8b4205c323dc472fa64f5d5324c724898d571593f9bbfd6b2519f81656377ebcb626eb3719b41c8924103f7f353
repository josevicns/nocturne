// deno-fmt-ignore-file
import { Memory } from '../../../system/memory/index.mjs';
import { IsEnum } from '../../types/enum.mjs';
import { IsUnion } from '../../types/union.mjs';
import { Extends, ExtendsResult } from '../../extends/index.mjs';
import { EnumValuesToVariants } from '../enum/index.mjs';
import { EvaluateUnion, Flatten } from '../evaluate/index.mjs';
import { InstantiateType, CanInstantiate } from '../instantiate.mjs';
import { ExcludeDeferred } from '../../action/exclude.mjs';
function ExcludeUnion(types, right) {
    return types.reduce((result, head) => {
        return [...result, ...ExcludeType(head, right)];
    }, []);
}
function ExcludeType(left, right) {
    const check = Extends({}, left, right);
    const result = ExtendsResult.IsExtendsTrueLike(check) ? [] : [left];
    return result;
}
function ExcludeAction(left, right) {
    const remaining = (IsEnum(left) ? ExcludeUnion(EnumValuesToVariants(left.enum), right) :
        IsUnion(left) ? ExcludeUnion(Flatten(left.anyOf), right) :
            ExcludeType(left, right));
    const result = EvaluateUnion(remaining);
    return result;
}
function ExcludeImmediate(context, state, left, right, options) {
    const instantiatedLeft = InstantiateType(context, state, left);
    const instantiatedRight = InstantiateType(context, state, right);
    return Memory.Update(ExcludeAction(instantiatedLeft, instantiatedRight), {}, options);
}
export function ExcludeInstantiate(context, state, left, right, options) {
    return (CanInstantiate(context, [left, right])
        ? ExcludeImmediate(context, state, left, right, options)
        : ExcludeDeferred(left, right, options));
}
