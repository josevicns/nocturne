import { type TSchema, type TSchemaOptions } from '../../types/schema.mjs';
import { type TProperties } from '../../types/properties.mjs';
import { type TPartialDeferred } from '../../action/partial.mjs';
import { type TFromType } from './from-type.mjs';
import { type TState, type TInstantiateType, type TCanInstantiate } from '../instantiate.mjs';
type TPartialImmediate<Context extends TProperties, State extends TState, Type extends TSchema, InstantiatedType extends TSchema = TInstantiateType<Context, State, Type>> = TFromType<InstantiatedType>;
export type TPartialInstantiate<Context extends TProperties, State extends TState, Type extends TSchema> = TCanInstantiate<Context, [Type]> extends true ? TPartialImmediate<Context, State, Type> : TPartialDeferred<Type>;
export declare function PartialInstantiate<Context extends TProperties, State extends TState, Type extends TSchema>(context: Context, state: State, type: Type, options: TSchemaOptions): TPartialInstantiate<Context, State, Type>;
export {};
