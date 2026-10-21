import { type TSchema, type TSchemaOptions } from '../../types/schema.mjs';
import { type TProperties } from '../../types/properties.mjs';
import { type TFromType } from './from-type.mjs';
import { type TRequiredDeferred } from '../../action/required.mjs';
import { type TState, type TInstantiateType, type TCanInstantiate } from '../instantiate.mjs';
type TRequiredImmediate<Context extends TProperties, State extends TState, Type extends TSchema, InstantiatedType extends TSchema = TInstantiateType<Context, State, Type>> = TFromType<InstantiatedType>;
export type TRequiredInstantiate<Context extends TProperties, State extends TState, Type extends TSchema> = TCanInstantiate<Context, [Type]> extends true ? TRequiredImmediate<Context, State, Type> : TRequiredDeferred<Type>;
export declare function RequiredInstantiate<Context extends TProperties, State extends TState, Type extends TSchema>(context: Context, state: State, type: Type, options: TSchemaOptions): TRequiredInstantiate<Context, State, Type>;
export {};
