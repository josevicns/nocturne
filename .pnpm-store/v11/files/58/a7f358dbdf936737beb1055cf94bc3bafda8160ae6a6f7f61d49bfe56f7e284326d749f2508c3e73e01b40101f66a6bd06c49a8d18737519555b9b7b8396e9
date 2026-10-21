import { type TSchema, type TSchemaOptions } from '../../types/schema.mjs';
import { type TProperties } from '../../types/properties.mjs';
import { type TRecordDeferred } from '../../types/record.mjs';
import { type TFromKey } from './from-key.mjs';
import { type TState, type TInstantiateType, type TCanInstantiate } from '../instantiate.mjs';
type TRecordImmediate<Context extends TProperties, State extends TState, Key extends TSchema, Value extends TSchema, InstantatedKey extends TSchema = TInstantiateType<Context, State, Key>, InstantiatedValue extends TSchema = TInstantiateType<Context, State, Value>, Result extends TSchema = TFromKey<InstantatedKey, InstantiatedValue>> = Result;
export type TRecordInstantiate<Context extends TProperties, State extends TState, Key extends TSchema, Value extends TSchema> = TCanInstantiate<Context, [Key]> extends true ? TRecordImmediate<Context, State, Key, Value> : TRecordDeferred<Key, Value>;
export declare function RecordInstantiate<Context extends TProperties, State extends TState, Key extends TSchema, Value extends TSchema>(context: Context, state: State, key: Key, value: Value, options: TSchemaOptions): TRecordInstantiate<Context, State, Key, Value>;
export {};
