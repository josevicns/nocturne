// deno-fmt-ignore-file
import { Memory } from '../../../system/memory/index.mjs';
import { Guard } from '../../../guard/index.mjs';
import { Object } from '../../types/object.mjs';
import { ToIndexableKeys } from '../indexable/to-indexable-keys.mjs';
import { ToIndexable } from '../indexable/to-indexable.mjs';
import { PickDeferred } from '../../action/pick.mjs';
import { InstantiateType, CanInstantiate } from '../instantiate.mjs';
function FromKeys(properties, keys) {
    const result = Guard.Keys(properties).reduce((result, key) => {
        return keys.includes(key) ? Memory.Assign(result, { [key]: properties[key] }) : result;
    }, {});
    return result;
}
function PickAction(type, indexer) {
    const indexable = ToIndexable(type);
    const keys = ToIndexableKeys(indexer);
    const applied = FromKeys(indexable, keys);
    const result = Object(applied);
    return result;
}
function PickImmediate(context, state, type, indexer, options) {
    const instantiatedType = InstantiateType(context, state, type);
    const instantiatedIndexer = InstantiateType(context, state, indexer);
    return Memory.Update(PickAction(instantiatedType, instantiatedIndexer), {}, options);
}
export function PickInstantiate(context, state, type, indexer, options) {
    return (CanInstantiate(context, [type, indexer])
        ? PickImmediate(context, state, type, indexer, options)
        : PickDeferred(type, indexer, options));
}
