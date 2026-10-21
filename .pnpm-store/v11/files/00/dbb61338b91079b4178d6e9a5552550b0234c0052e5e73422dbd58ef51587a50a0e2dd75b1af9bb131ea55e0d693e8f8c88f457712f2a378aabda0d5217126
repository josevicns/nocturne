import { type TSchema, type TSchemaOptions } from '../../types/schema.mjs';
import { type TProperties } from '../../types/properties.mjs';
import { type TNull } from '../../types/null.mjs';
import { type TUndefined } from '../../types/undefined.mjs';
import { type TUnion } from '../../types/union.mjs';
import { type TExcludeInstantiate } from '../exclude/instantiate.mjs';
import { type TNonNullableDeferred } from '../../action/non-nullable.mjs';
import { type TState, type TInstantiateType, type TCanInstantiate } from '../instantiate.mjs';
type TNonNullableAction<Type extends TSchema, Excluded extends TSchema = TUnion<[TNull, TUndefined]>> = TExcludeInstantiate<{}, {
    callstack: [];
}, Type, Excluded>;
type TNonNullableImmediate<Context extends TProperties, State extends TState, Type extends TSchema, InstantiatedType extends TSchema = TInstantiateType<Context, State, Type>, Result extends TSchema = TNonNullableAction<InstantiatedType>> = Result;
export type TNonNullableInstantiate<Context extends TProperties, State extends TState, Type extends TSchema> = TCanInstantiate<Context, [Type]> extends true ? TNonNullableImmediate<Context, State, Type> : TNonNullableDeferred<Type>;
export declare function NonNullableInstantiate<Context extends TProperties, State extends TState, Type extends TSchema>(context: Context, state: State, type: Type, options: TSchemaOptions): TNonNullableInstantiate<Context, State, Type>;
export {};
