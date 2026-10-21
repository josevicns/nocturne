// deno-fmt-ignore-file
import { Memory } from '../../../system/memory/index.mjs';
import { FromType } from './from-type.mjs';
import { RequiredDeferred } from '../../action/required.mjs';
import { InstantiateType, CanInstantiate } from '../instantiate.mjs';
function RequiredImmediate(context, state, type, options) {
    const instaniatedType = InstantiateType(context, state, type);
    return Memory.Update(FromType(instaniatedType), {}, options);
}
export function RequiredInstantiate(context, state, type, options) {
    return (CanInstantiate(context, [type])
        ? RequiredImmediate(context, state, type, options)
        : RequiredDeferred(type, options));
}
