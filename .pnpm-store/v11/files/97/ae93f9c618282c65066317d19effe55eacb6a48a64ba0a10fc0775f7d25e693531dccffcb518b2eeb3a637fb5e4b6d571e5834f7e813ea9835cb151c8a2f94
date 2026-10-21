// deno-fmt-ignore-file
import { Memory } from '../../../system/memory/index.mjs';
import { IsAny } from '../../types/any.mjs';
import { IsArray } from '../../types/array.mjs';
import { IsCyclic } from '../../types/cyclic.mjs';
import { IsIntersect } from '../../types/intersect.mjs';
import { Never } from '../../types/never.mjs';
import { IsObject } from '../../types/object.mjs';
import { IsRecord } from '../../types/record.mjs';
import { IsTuple } from '../../types/tuple.mjs';
import { IsUnion } from '../../types/union.mjs';
import { KeyOfDeferred } from '../../action/keyof.mjs';
import { InstantiateType, CanInstantiate } from '../instantiate.mjs';
import { CollapseToObject } from '../object/index.mjs';
// ------------------------------------------------------------------
// Computed
// ------------------------------------------------------------------
import { FromAny } from './from-any.mjs';
import { FromArray } from './from-array.mjs';
import { FromObject } from './from-object.mjs';
import { FromRecord } from './from-record.mjs';
import { FromTuple } from './from-tuple.mjs';
function NormalizeType(type) {
    const result = (IsCyclic(type) || IsIntersect(type) || IsUnion(type) ? CollapseToObject(type) :
        type);
    return result;
}
export function KeyOfAction(type) {
    const normal = NormalizeType(type);
    return (IsAny(normal) ? FromAny() :
        IsArray(normal) ? FromArray(normal.items) :
            IsObject(normal) ? FromObject(normal.properties) :
                IsRecord(normal) ? FromRecord(normal) :
                    IsTuple(normal) ? FromTuple(normal.items) :
                        Never());
}
export function KeyOfImmediate(context, state, type, options) {
    const instantiatedType = InstantiateType(context, state, type);
    return Memory.Update(KeyOfAction(instantiatedType), {}, options);
}
export function KeyOfInstantiate(context, state, type, options) {
    return (CanInstantiate(context, [type])
        ? KeyOfImmediate(context, state, type, options)
        : KeyOfDeferred(type, options));
}
