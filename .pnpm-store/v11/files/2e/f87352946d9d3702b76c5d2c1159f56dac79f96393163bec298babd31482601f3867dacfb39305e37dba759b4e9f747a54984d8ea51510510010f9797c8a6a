// deno-fmt-ignore-file
import { Memory } from '../../../system/memory/index.mjs';
import { CanInstantiate, InstantiateType } from '../instantiate.mjs';
import { OptionsDeferred } from '../../action/options.mjs';
function OptionsImmediate(context, state, type, options) {
    const instaniatedType = InstantiateType(context, state, type);
    return Memory.Update(instaniatedType, {}, options);
}
export function OptionsInstantiate(context, state, type, options) {
    return (CanInstantiate(context, [type])
        ? OptionsImmediate(context, state, type, options)
        : OptionsDeferred(type, options));
}
