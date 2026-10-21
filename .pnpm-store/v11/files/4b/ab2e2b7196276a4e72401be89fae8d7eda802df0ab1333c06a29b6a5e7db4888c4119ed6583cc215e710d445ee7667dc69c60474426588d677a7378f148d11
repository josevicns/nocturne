// deno-fmt-ignore-file
import { Memory } from '../../../system/memory/index.mjs';
import { Union } from '../../types/union.mjs';
import { Extends, ExtendsResult } from '../../extends/index.mjs';
import { InstantiateType, CanInstantiate } from '../instantiate.mjs';
import { ConditionalDeferred } from '../../action/conditional.mjs';
function ConditionalImmediate(context, state, left, right, true_, false_, options) {
    const instantiatedLeft = InstantiateType(context, state, left);
    const instantiatedRight = InstantiateType(context, state, right);
    const extendsResult = Extends(context, instantiatedLeft, instantiatedRight);
    return Memory.Update((ExtendsResult.IsExtendsUnion(extendsResult) ? Union([InstantiateType(extendsResult.inferred, state, true_), InstantiateType(context, state, false_)]) :
        ExtendsResult.IsExtendsTrue(extendsResult) ? InstantiateType(extendsResult.inferred, state, true_) :
            InstantiateType(context, state, false_)), {}, options);
}
export function ConditionalInstantiate(context, state, left, right, true_, false_, options) {
    return (CanInstantiate(context, [left, right])
        ? ConditionalImmediate(context, state, left, right, true_, false_, options)
        : ConditionalDeferred(left, right, true_, false_, options));
}
