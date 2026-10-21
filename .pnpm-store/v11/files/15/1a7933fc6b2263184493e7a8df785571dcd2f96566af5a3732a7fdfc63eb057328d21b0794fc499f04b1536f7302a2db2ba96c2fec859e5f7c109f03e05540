// deno-fmt-ignore-file
import * as T from '../../type/index.mjs';
import { FromArray } from './from-array.mjs';
import { FromBase } from './from-base.mjs';
import { FromBigInt } from './from-bigint.mjs';
import { FromBoolean } from './from-boolean.mjs';
import { FromCyclic } from './from-cyclic.mjs';
import { FromEnum } from './from-enum.mjs';
import { FromInteger } from './from-integer.mjs';
import { FromIntersect } from './from-intersect.mjs';
import { FromLiteral } from './from-literal.mjs';
import { FromNull } from './from-null.mjs';
import { FromNumber } from './from-number.mjs';
import { FromObject } from './from-object.mjs';
import { FromRecord } from './from-record.mjs';
import { FromRef } from './from-ref.mjs';
import { FromString } from './from-string.mjs';
import { FromTemplateLiteral } from './from-template-literal.mjs';
import { FromTuple } from './from-tuple.mjs';
import { FromUndefined } from './from-undefined.mjs';
import { FromUnion } from './from-union.mjs';
import { FromVoid } from './from-void.mjs';
export function FromType(context, type, value) {
    return (T.IsArray(type) ? FromArray(context, type, value) :
        T.IsBase(type) ? FromBase(context, type, value) :
            T.IsBigInt(type) ? FromBigInt(context, type, value) :
                T.IsBoolean(type) ? FromBoolean(context, type, value) :
                    T.IsCyclic(type) ? FromCyclic(context, type, value) :
                        T.IsEnum(type) ? FromEnum(context, type, value) :
                            T.IsInteger(type) ? FromInteger(context, type, value) :
                                T.IsIntersect(type) ? FromIntersect(context, type, value) :
                                    T.IsLiteral(type) ? FromLiteral(context, type, value) :
                                        T.IsNull(type) ? FromNull(context, type, value) :
                                            T.IsNumber(type) ? FromNumber(context, type, value) :
                                                T.IsObject(type) ? FromObject(context, type, value) :
                                                    T.IsRecord(type) ? FromRecord(context, type, value) :
                                                        T.IsRef(type) ? FromRef(context, type, value) :
                                                            T.IsString(type) ? FromString(context, type, value) :
                                                                T.IsTemplateLiteral(type) ? FromTemplateLiteral(context, type, value) :
                                                                    T.IsTuple(type) ? FromTuple(context, type, value) :
                                                                        T.IsUndefined(type) ? FromUndefined(context, type, value) :
                                                                            T.IsUnion(type) ? FromUnion(context, type, value) :
                                                                                T.IsVoid(type) ? FromVoid(context, type, value) :
                                                                                    value);
}
