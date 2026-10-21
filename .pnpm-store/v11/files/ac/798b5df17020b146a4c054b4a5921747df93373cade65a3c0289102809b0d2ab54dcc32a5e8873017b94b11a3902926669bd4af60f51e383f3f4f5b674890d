// deno-fmt-ignore-file
import { Memory } from '../../../system/memory/index.mjs';
import { IsConstructor } from '../../types/constructor.mjs';
import { Never } from '../../types/never.mjs';
import { Tuple } from '../../types/tuple.mjs';
import { ConstructorParametersDeferred } from '../../action/constructor-parameters.mjs';
import { InstantiateType, CanInstantiate } from '../instantiate.mjs';
function ConstructorParametersAction(type) {
    return (IsConstructor(type)
        ? InstantiateType({}, { callstack: [] }, Tuple(type.parameters))
        : Never());
}
function ConstructorParametersImmediate(context, state, type, options) {
    const instantiatedType = InstantiateType(context, state, type);
    return Memory.Update(ConstructorParametersAction(instantiatedType), {}, options);
}
export function ConstructorParametersInstantiate(context, state, type, options) {
    return (CanInstantiate(context, [type])
        ? ConstructorParametersImmediate(context, state, type, options)
        : ConstructorParametersDeferred(type, options));
}
