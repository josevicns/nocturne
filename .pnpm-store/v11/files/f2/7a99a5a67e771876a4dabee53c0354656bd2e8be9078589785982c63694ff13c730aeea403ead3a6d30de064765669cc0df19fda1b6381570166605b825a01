// deno-fmt-ignore-file
import { Memory } from '../../../system/memory/index.mjs';
import { Guard } from '../../../guard/index.mjs';
import { Object } from '../../types/object.mjs';
import { ToIndexableKeys } from '../indexable/to-indexable-keys.mjs';
import { ToIndexable } from '../indexable/to-indexable.mjs';
import { OmitDeferred } from '../../action/omit.mjs';
import { InstantiateType, CanInstantiate } from '../instantiate.mjs';
function FromKeys(properties, keys) {
    const result = Guard.Keys(properties).reduce((result, key) => {
        return keys.includes(key) ? result : { ...result, [key]: properties[key] };
    }, {});
    return result;
}
function OmitAction(type, indexer) {
    const indexable = ToIndexable(type);
    const indexableKeys = ToIndexableKeys(indexer);
    const omitted = FromKeys(indexable, indexableKeys);
    const result = Object(omitted);
    return result;
}
function OmitImmediate(context, state, type, indexer, options) {
    const instantiatedType = InstantiateType(context, state, type);
    const instantiatedIndexer = InstantiateType(context, state, indexer);
    return Memory.Update(OmitAction(instantiatedType, instantiatedIndexer), {}, options);
}
export function OmitInstantiate(context, state, type, indexer, options) {
    return (CanInstantiate(context, [type, indexer])
        ? OmitImmediate(context, state, type, indexer, options)
        : OmitDeferred(type, indexer, options));
}
