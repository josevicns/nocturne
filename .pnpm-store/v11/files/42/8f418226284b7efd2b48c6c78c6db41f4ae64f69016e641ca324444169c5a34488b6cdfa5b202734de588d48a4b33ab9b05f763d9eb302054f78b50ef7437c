// deno-fmt-ignore-file
import { Memory } from '../../../system/memory/index.mjs';
import { Null } from '../../types/null.mjs';
import { Undefined } from '../../types/undefined.mjs';
import { Union } from '../../types/union.mjs';
import { ExcludeInstantiate } from '../exclude/instantiate.mjs';
import { NonNullableDeferred } from '../../action/non-nullable.mjs';
import { InstantiateType, CanInstantiate } from '../instantiate.mjs';
function NonNullableAction(type) {
    const excluded = Union([Null(), Undefined()]);
    return ExcludeInstantiate({}, { callstack: [] }, type, excluded, {});
}
function NonNullableImmediate(context, state, type, options) {
    const instantiatedType = InstantiateType(context, state, type);
    return Memory.Update(NonNullableAction(instantiatedType), {}, options);
}
export function NonNullableInstantiate(context, state, type, options) {
    return (CanInstantiate(context, [type])
        ? NonNullableImmediate(context, state, type, options)
        : NonNullableDeferred(type, options));
}
