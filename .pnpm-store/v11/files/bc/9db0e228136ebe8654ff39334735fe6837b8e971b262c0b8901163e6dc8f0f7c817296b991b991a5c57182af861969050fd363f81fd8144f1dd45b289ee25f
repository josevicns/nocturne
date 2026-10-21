import { type TSchema, type TSchemaOptions } from '../../types/schema.mjs';
import { type TProperties } from '../../types/properties.mjs';
import { type TFunction } from '../../types/function.mjs';
import { type TNever } from '../../types/never.mjs';
import { type TTuple } from '../../types/tuple.mjs';
import { type TParametersDeferred } from '../../action/parameters.mjs';
import { type TState, type TInstantiateType, type TCanInstantiate } from '../instantiate.mjs';
type TParametersAction<Type extends TSchema> = (Type extends TFunction<infer Parameters extends TSchema[], infer _ extends TSchema> ? TInstantiateType<{}, {
    callstack: [];
}, TTuple<Parameters>> : TNever);
type TParametersImmediate<Context extends TProperties, State extends TState, Type extends TSchema, InstantatedType extends TSchema = TInstantiateType<Context, State, Type>> = TParametersAction<InstantatedType>;
export type TParametersInstantiate<Context extends TProperties, State extends TState, Type extends TSchema> = (TCanInstantiate<Context, [Type]> extends true ? TParametersImmediate<Context, State, Type> : TParametersDeferred<Type>);
export declare function ParametersInstantiate<Context extends TProperties, State extends TState, Type extends TSchema>(context: Context, state: State, type: Type, options: TSchemaOptions): TParametersInstantiate<Context, State, Type>;
export {};
