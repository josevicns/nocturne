// deno-fmt-ignore-file
import { Memory } from '../../../system/memory/index.mjs';
import { IsConstructor } from '../../types/constructor.mjs';
import { Never } from '../../types/never.mjs';
import { InstanceTypeDeferred } from '../../action/instance-type.mjs';
import { InstantiateType, CanInstantiate } from '../instantiate.mjs';
function InstanceTypeAction(type) {
    return (IsConstructor(type)
        ? type.instanceType
        : Never());
}
export function InstanceTypeImmediate(context, state, type, options) {
    const instantiatedType = InstantiateType(context, state, type);
    return Memory.Update(InstanceTypeAction(instantiatedType), {}, options);
}
export function InstanceTypeInstantiate(context, state, type, options = {}) {
    return (CanInstantiate(context, [type])
        ? InstanceTypeImmediate(context, state, type, options)
        : InstanceTypeDeferred(type, options));
}
