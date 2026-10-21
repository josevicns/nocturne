// deno-fmt-ignore-file
import { Memory } from '../../../system/memory/index.mjs';
import { IsFunction } from '../../types/function.mjs';
import { Never } from '../../types/never.mjs';
import { Tuple } from '../../types/tuple.mjs';
import { ParametersDeferred } from '../../action/parameters.mjs';
import { InstantiateType, CanInstantiate } from '../instantiate.mjs';
function ParametersAction(type) {
    return (IsFunction(type)
        ? InstantiateType({}, { callstack: [] }, Tuple(type.parameters)) // spread-rest
        : Never());
}
function ParametersImmediate(context, state, type, options) {
    const instantiatedType = InstantiateType(context, state, type);
    return Memory.Update(ParametersAction(instantiatedType), {}, options);
}
export function ParametersInstantiate(context, state, type, options) {
    return (CanInstantiate(context, [type])
        ? ParametersImmediate(context, state, type, options)
        : ParametersDeferred(type, options));
}
