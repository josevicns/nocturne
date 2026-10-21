// deno-fmt-ignore-file
import { Memory } from '../../../system/memory/index.mjs';
import { ReadonlyTypeDeferred } from '../../action/readonly-type.mjs';
import { FromType } from './from-type.mjs';
import { InstantiateType, CanInstantiate } from '../instantiate.mjs';
function ReadonlyTypeImmediate(context, state, type, options) {
    const instantiatedType = InstantiateType(context, state, type);
    return Memory.Update(FromType(instantiatedType), {}, options);
}
export function ReadonlyTypeInstantiate(context, state, type, options) {
    return (CanInstantiate(context, [type])
        ? ReadonlyTypeImmediate(context, state, type, options)
        : ReadonlyTypeDeferred(type, options));
}
