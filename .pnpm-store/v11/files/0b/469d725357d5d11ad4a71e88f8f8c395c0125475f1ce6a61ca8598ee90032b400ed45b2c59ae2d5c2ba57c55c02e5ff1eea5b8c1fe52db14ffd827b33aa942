// deno-fmt-ignore-file
import { Memory } from '../../../system/memory/index.mjs';
import { IsPromise } from '../../types/promise.mjs';
import { AwaitedDeferred } from '../../action/awaited.mjs';
import { InstantiateType, CanInstantiate } from '../instantiate.mjs';
function AwaitedAction(type) {
    return (IsPromise(type)
        ? AwaitedAction(type.item)
        : type);
}
function AwaitedImmediate(context, state, type, options) {
    const instantiatedType = InstantiateType(context, state, type);
    return Memory.Update(AwaitedAction(instantiatedType), {}, options);
}
export function AwaitedInstantiate(context, state, type, options) {
    return (CanInstantiate(context, [type])
        ? AwaitedImmediate(context, state, type, options)
        : AwaitedDeferred(type, options));
}
