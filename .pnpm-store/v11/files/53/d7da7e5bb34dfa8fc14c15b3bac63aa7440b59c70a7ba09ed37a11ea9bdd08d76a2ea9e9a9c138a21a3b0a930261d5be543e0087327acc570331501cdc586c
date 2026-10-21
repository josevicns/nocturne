import { type TSchema, type TObjectOptions } from './schema.mjs';
import { type StaticType, type StaticDirection } from './static.mjs';
import { type TProperties } from './properties.mjs';
import { type TInteger } from './integer.mjs';
import { type TNumber } from './number.mjs';
import { type TString } from './string.mjs';
import { type TDeferred } from './deferred.mjs';
import { type TInstantiate } from '../engine/instantiate.mjs';
export type StaticRecord<Stack extends string[], Direction extends StaticDirection, Context extends TProperties, This extends TProperties, Key extends string, Value extends TSchema, StaticValue extends unknown = StaticType<Stack, Direction, Context, This, Value>, Result extends Record<PropertyKey, unknown> = (Key extends TStringKey ? Record<string, StaticValue> : Key extends TIntegerKey ? Record<number, StaticValue> : Key extends TNumberKey ? Record<number, StaticValue> : Record<string, StaticValue>)> = Result;
export type TStringKey = typeof StringKey;
export type TIntegerKey = typeof IntegerKey;
export type TNumberKey = typeof NumberKey;
export declare const IntegerKey = "^-?(?:0|[1-9][0-9]*)$";
export declare const NumberKey = "^-?(?:0|[1-9][0-9]*)(?:.[0-9]+)?$";
export declare const StringKey = "^.*$";
export interface TRecord<Key extends string = string, Value extends TSchema = TSchema> extends TSchema {
    '~kind': 'Record';
    type: 'object';
    patternProperties: {
        [_ in Key]: Value;
    };
}
/** Represents a deferred Record action. */
export type TRecordDeferred<Key extends TSchema, Value extends TSchema> = (TDeferred<'Record', [Key, Value]>);
/** Represents a deferred Record action. */
export declare function RecordDeferred<Key extends TSchema, Value extends TSchema>(key: Key, value: Value, options?: TObjectOptions): TRecordDeferred<Key, Value>;
export type TRecordConstruct<Key extends TSchema, Value extends TSchema> = (TInstantiate<{}, TRecordDeferred<Key, Value>>);
export declare function RecordConstruct<Key extends TSchema, Value extends TSchema>(key: Key, value: Value, options?: TObjectOptions): TRecordConstruct<Key, Value>;
/** Creates a Record type. */
export declare function Record<Key extends TSchema, Value extends TSchema>(key: Key, value: Value, options?: TObjectOptions): TRecordConstruct<Key, Value>;
/** Creates a Record type from regular expression pattern. */
export declare function RecordFromPattern<Pattern extends string, Value extends TSchema>(key: Pattern, value: Value): TRecord<Pattern, Value>;
/** Returns the raw string pattern used for the Record key  */
export type TRecordPattern<Type extends TRecord, Result extends string = Extract<keyof Type['patternProperties'], string>> = Result;
/** Returns the raw string pattern used for the Record key  */
export declare function RecordPattern<Type extends TRecord>(type: Type): TRecordPattern<Type>;
/** Returns the Record key as a TypeBox type  */
export type TRecordKey<Type extends TRecord, Pattern extends string = TRecordPattern<Type>, Result extends TSchema = (Pattern extends typeof IntegerKey ? TInteger : Pattern extends typeof NumberKey ? TNumber : TString)> = Result;
/** Returns the Record key as a TypeBox type  */
export declare function RecordKey<Type extends TRecord>(type: Type): TRecordKey<Type>;
export type TRecordValue<Type extends TRecord, Result extends TSchema = Type['patternProperties'][TRecordPattern<Type>]> = Result;
export declare function RecordValue<Type extends TRecord>(type: Type): TRecordValue<Type>;
export declare function IsRecord(value: unknown): value is TRecord;
export declare function RecordOptions(type: TRecord): TObjectOptions;
