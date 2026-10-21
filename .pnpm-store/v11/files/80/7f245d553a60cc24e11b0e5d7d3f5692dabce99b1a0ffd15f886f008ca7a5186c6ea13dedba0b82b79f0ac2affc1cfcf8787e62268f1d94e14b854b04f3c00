// deno-fmt-ignore-file
// deno-lint-ignore-file
import { Memory } from '../../../system/memory/index.mjs';
import { RecordDeferred } from '../../types/record.mjs';
import { FromKey } from './from-key.mjs';
import { InstantiateType, CanInstantiate } from '../instantiate.mjs';
function RecordImmediate(context, state, key, value, options) {
    const instanstiatedKey = InstantiateType(context, state, key);
    const instantiatedValue = InstantiateType(context, state, value);
    return Memory.Update(FromKey(instanstiatedKey, instantiatedValue), {}, options);
}
export function RecordInstantiate(context, state, key, value, options) {
    return (CanInstantiate(context, [key])
        ? RecordImmediate(context, state, key, value, options)
        : RecordDeferred(key, value, options));
}
