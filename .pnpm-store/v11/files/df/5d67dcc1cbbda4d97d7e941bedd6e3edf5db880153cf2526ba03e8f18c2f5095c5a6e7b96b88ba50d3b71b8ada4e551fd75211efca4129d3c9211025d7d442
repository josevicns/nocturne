// deno-fmt-ignore-file
import { Memory } from '../../../system/memory/index.mjs';
import { PartialDeferred } from '../../action/partial.mjs';
import { FromType } from './from-type.mjs';
import { InstantiateType, CanInstantiate } from '../instantiate.mjs';
function PartialImmediate(context, state, type, options) {
    const instantiatedType = InstantiateType(context, state, type);
    return Memory.Update(FromType(instantiatedType), {}, options);
}
export function PartialInstantiate(context, state, type, options) {
    return (CanInstantiate(context, [type])
        ? PartialImmediate(context, state, type, options)
        : PartialDeferred(type, options));
}
