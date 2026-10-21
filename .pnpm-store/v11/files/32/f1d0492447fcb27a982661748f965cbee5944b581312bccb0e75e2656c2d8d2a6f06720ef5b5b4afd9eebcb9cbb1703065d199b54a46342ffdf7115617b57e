// deno-fmt-ignore-file
import { Memory } from '../../../system/memory/index.mjs';
import { TemplateLiteralDeferred } from '../../types/template-literal.mjs';
import { TemplateLiteralEncode } from './encode.mjs';
import { InstantiateTypes, CanInstantiate } from '../instantiate.mjs';
function TemplateLiteralImmediate(context, state, types, options) {
    const instaniatedTypes = InstantiateTypes(context, state, types);
    return Memory.Update(TemplateLiteralEncode(instaniatedTypes), {}, options);
}
export function TemplateLiteralInstantiate(context, state, types, options) {
    return (CanInstantiate(context, types)
        ? TemplateLiteralImmediate(context, state, types, options)
        : TemplateLiteralDeferred(types, options));
}
