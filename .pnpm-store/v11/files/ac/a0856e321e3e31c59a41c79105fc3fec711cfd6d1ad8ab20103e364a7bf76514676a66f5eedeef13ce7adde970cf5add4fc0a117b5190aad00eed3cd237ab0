import { type StaticType, type StaticDirection } from './static.mjs';
import { type TSchema, type TArrayOptions } from './schema.mjs';
import { type TImmutable } from './_immutable.mjs';
import { type TProperties } from './properties.mjs';
export type StaticArray<Stack extends string[], Direction extends StaticDirection, Context extends TProperties, This extends TProperties, Array extends TSchema, Item extends TSchema, Result extends readonly unknown[] = Array extends TImmutable ? readonly StaticType<Stack, Direction, Context, This, Item>[] : StaticType<Stack, Direction, Context, This, Item>[]> = Result;
/** Represents an Array type. */
export interface TArray<Type extends TSchema = TSchema> extends TSchema {
    '~kind': 'Array';
    type: 'array';
    items: Type;
}
/** Creates an Array type. */
export declare function Array<Type extends TSchema>(items: Type, options?: TArrayOptions): TArray<Type>;
/** Returns true if the given value is a TArray. */
export declare function IsArray(value: unknown): value is TArray;
/** Extracts options from a TArray. */
export declare function ArrayOptions(type: TArray): TArrayOptions;
