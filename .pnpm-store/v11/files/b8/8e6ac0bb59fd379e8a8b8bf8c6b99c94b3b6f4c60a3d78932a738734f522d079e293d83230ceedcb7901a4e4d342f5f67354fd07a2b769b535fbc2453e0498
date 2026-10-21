import { type TSchema, type TSchemaOptions } from '../../types/schema.mjs';
import { type TProperties } from '../../types/properties.mjs';
import { type TReadonlyTypeDeferred } from '../../action/readonly-type.mjs';
import { type TFromType } from './from-type.mjs';
import { type TState, type TInstantiateType, type TCanInstantiate } from '../instantiate.mjs';
type TReadonlyTypeImmediate<Context extends TProperties, State extends TState, Type extends TSchema, InstantiatedType extends TSchema = TInstantiateType<Context, State, Type>> = TFromType<InstantiatedType>;
export type TReadonlyTypeInstantiate<Context extends TProperties, State extends TState, Type extends TSchema> = TCanInstantiate<Context, [Type]> extends true ? TReadonlyTypeImmediate<Context, State, Type> : TReadonlyTypeDeferred<Type>;
export declare function ReadonlyTypeInstantiate<Context extends TProperties, State extends TState, Type extends TSchema>(context: Context, state: State, type: Type, options: TSchemaOptions): TReadonlyTypeInstantiate<Context, State, Type>;
export {};
