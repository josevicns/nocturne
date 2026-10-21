// deno-fmt-ignore-file
import { Memory } from '../../../system/memory/index.mjs';
import { IsEnum } from '../../types/enum.mjs';
import { IsUnion } from '../../types/union.mjs';
import { Extends, ExtendsResult } from '../../extends/index.mjs';
import { EnumValuesToVariants } from '../enum/index.mjs';
import { EvaluateUnion, Flatten } from '../evaluate/index.mjs';
import { InstantiateType, CanInstantiate } from '../instantiate.mjs';
import { ExtractDeferred } from '../../action/extract.mjs';
function ExtractUnion(types, right) {
    return types.reduce((result, head) => {
        return [...result, ...ExtractType(head, right)];
    }, []);
}
function ExtractType(left, right) {
    const check = Extends({}, left, right);
    const result = ExtendsResult.IsExtendsTrueLike(check) ? [left] : [];
    return result;
}
function ExtractAction(left, right) {
    const remaining = (IsEnum(left) ? ExtractUnion(EnumValuesToVariants(left.enum), right) :
        IsUnion(left) ? ExtractUnion(Flatten(left.anyOf), right) :
            ExtractType(left, right));
    const result = EvaluateUnion(remaining);
    return result;
}
function ExtractImmediate(context, state, left, right, options) {
    const instantiatedLeft = InstantiateType(context, state, left);
    const instantiatedRight = InstantiateType(context, state, right);
    return Memory.Update(ExtractAction(instantiatedLeft, instantiatedRight), {}, options);
}
export function ExtractInstantiate(context, state, left, right, options) {
    return (CanInstantiate(context, [left, right])
        ? ExtractImmediate(context, state, left, right, options)
        : ExtractDeferred(left, right, options));
}
