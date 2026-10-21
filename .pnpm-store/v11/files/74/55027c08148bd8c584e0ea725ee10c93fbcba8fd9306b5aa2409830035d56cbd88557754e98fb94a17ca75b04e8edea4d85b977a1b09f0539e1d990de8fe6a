// deno-fmt-ignore-file
import { Memory } from '../../../system/memory/index.mjs';
import { IsArray } from '../../types/array.mjs';
import { IsCyclic } from '../../types/cyclic.mjs';
import { IsIntersect } from '../../types/intersect.mjs';
import { Never } from '../../types/never.mjs';
import { IsObject } from '../../types/object.mjs';
import { IsTuple } from '../../types/tuple.mjs';
import { IsUnion } from '../../types/union.mjs';
import { FromArray } from './from-array.mjs';
import { FromObject } from './from-object.mjs';
import { FromTuple } from './from-tuple.mjs';
import { InstantiateType, CanInstantiate } from '../instantiate.mjs';
import { IndexDeferred } from '../../action/indexed.mjs';
import { CollapseToObject } from '../object/index.mjs';
function NormalizeType(type) {
    const result = (IsCyclic(type) || IsIntersect(type) || IsUnion(type) ? CollapseToObject(type) :
        type);
    return result;
}
function IndexAction(type, indexer) {
    const normal = NormalizeType(type);
    return (IsArray(normal) ? FromArray(normal.items, indexer) :
        IsObject(normal) ? FromObject(normal.properties, indexer) :
            IsTuple(normal) ? FromTuple(normal.items, indexer) :
                Never());
}
function IndexImmediate(context, state, type, indexer, options) {
    const instantiatedType = InstantiateType(context, state, type);
    const instantiatedIndexer = InstantiateType(context, state, indexer);
    return Memory.Update(IndexAction(instantiatedType, instantiatedIndexer), {}, options);
}
export function IndexInstantiate(context, state, type, indexer, options) {
    return (CanInstantiate(context, [type, indexer])
        ? IndexImmediate(context, state, type, indexer, options)
        : IndexDeferred(type, indexer, options));
}
