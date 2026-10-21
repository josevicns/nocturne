import { type TSchema, type TSchemaOptions } from '../../types/schema.mjs';
import { type TProperties } from '../../types/properties.mjs';
import { type TConstructor } from '../../types/constructor.mjs';
import { type TNever } from '../../types/never.mjs';
import { type TTuple } from '../../types/tuple.mjs';
import { type TConstructorParametersDeferred } from '../../action/constructor-parameters.mjs';
import { type TState, type TInstantiateType, type TCanInstantiate } from '../instantiate.mjs';
type TConstructorParametersAction<Type extends TSchema> = (Type extends TConstructor<infer Parameters extends TSchema[], infer _ extends TSchema> ? TInstantiateType<{}, {
    callstack: [];
}, TTuple<Parameters>> : TNever);
type TConstructorParametersImmediate<Context extends TProperties, State extends TState, Type extends TSchema, InstantiatedType extends TSchema = TInstantiateType<Context, State, Type>> = TConstructorParametersAction<InstantiatedType>;
export type TConstructorParametersInstantiate<Context extends TProperties, State extends TState, Type extends TSchema> = TCanInstantiate<Context, [Type]> extends true ? TConstructorParametersImmediate<Context, State, Type> : TConstructorParametersDeferred<Type>;
export declare function ConstructorParametersInstantiate<Context extends TProperties, State extends TState, Type extends TSchema>(context: Context, state: State, type: Type, options: TSchemaOptions): TConstructorParametersInstantiate<Context, State, Type>;
export {};
