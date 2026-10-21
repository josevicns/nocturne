import { type TProperties } from '../../types/properties.mjs';
import { type TSchema } from '../../types/schema.mjs';
import { type TState, type TInstantiateType, TCanInstantiate } from '../instantiate.mjs';
import { type TOptionsDeferred, type TOptions } from '../../action/options.mjs';
type TOptionsImmediate<Context extends TProperties, State extends TState, Type extends TSchema, Options extends TSchema, InstantiatedType extends TSchema = TInstantiateType<Context, State, Type>, Result extends TSchema = TOptions<InstantiatedType, Options>> = Result;
export type TOptionsInstantiate<Context extends TProperties, State extends TState, Type extends TSchema, Options extends TSchema> = TCanInstantiate<Context, [Type]> extends true ? TOptionsImmediate<Context, State, Type, Options> : TOptionsDeferred<Type, Options>;
export declare function OptionsInstantiate<Context extends TProperties, State extends TState, Type extends TSchema, Options extends TSchema>(context: Context, state: State, type: Type, options: Options): TOptionsInstantiate<Context, State, Type, Options>;
export {};
