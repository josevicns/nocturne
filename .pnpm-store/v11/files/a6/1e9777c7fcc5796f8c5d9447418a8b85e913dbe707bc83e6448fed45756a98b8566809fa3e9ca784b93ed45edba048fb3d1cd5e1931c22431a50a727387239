import { type TSchema, type TSchemaOptions } from '../../types/schema.mjs';
import { type TProperties } from '../../types/properties.mjs';
import { type TState, type TInstantiateType } from '../instantiate.mjs';
import { type TEvaluateType } from './evaluate.mjs';
type TEvaluateImmediate<Context extends TProperties, State extends TState, Type extends TSchema, InstantiatedType extends TSchema = TInstantiateType<Context, State, Type>> = TEvaluateType<InstantiatedType>;
export type TEvaluateInstantiate<Context extends TProperties, State extends TState, Type extends TSchema> = TEvaluateImmediate<Context, State, Type>;
export declare function EvaluateInstantiate<Context extends TProperties, State extends TState, Type extends TSchema>(context: Context, state: State, type: Type, options: TSchemaOptions): TEvaluateInstantiate<Context, State, Type>;
export {};
