// deno-fmt-ignore-file
import { Memory } from '../../../system/memory/index.mjs';
import { IsFunction } from '../../types/function.mjs';
import { Never } from '../../types/never.mjs';
import { ReturnTypeDeferred } from '../../action/return-type.mjs';
import { InstantiateType, CanInstantiate } from '../instantiate.mjs';
function ReturnTypeAction(type) {
    return (IsFunction(type) ? type.returnType : Never());
}
function ReturnTypeImmediate(context, state, type, options) {
    const instantiatedType = InstantiateType(context, state, type);
    return Memory.Update(ReturnTypeAction(instantiatedType), {}, options);
}
export function ReturnTypeInstantiate(context, state, type, options) {
    return (CanInstantiate(context, [type])
        ? ReturnTypeImmediate(context, state, type, options)
        : ReturnTypeDeferred(type, options));
}
