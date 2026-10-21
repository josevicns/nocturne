/** Returns true if this value is an array */
export declare function IsArray(value: unknown): value is unknown[];
/** Returns true if this value is an async iterator */
export declare function IsAsyncIterator(value: unknown): value is AsyncIterableIterator<unknown>;
/** Returns true if this value is bigint */
export declare function IsBigInt(value: unknown): value is bigint;
/** Returns true if this value is a boolean */
export declare function IsBoolean(value: unknown): value is boolean;
/** Returns true if this value is a constructor */
export declare function IsConstructor(value: unknown): value is new (...args: never[]) => unknown;
/** Returns true if this value is a function */
export declare function IsFunction(value: unknown): value is Function;
/** Returns true if this value is integer */
export declare function IsInteger(value: unknown): value is number;
/** Returns true if this value is an iterator */
export declare function IsIterator(value: unknown): value is IterableIterator<unknown>;
/** Returns true if this value is null */
export declare function IsNull(value: unknown): value is null;
/** Returns true if this value is number */
export declare function IsNumber(value: unknown): value is number;
/** Returns true if this value is an object but not an array */
export declare function IsObjectNotArray(value: unknown): value is Record<PropertyKey, unknown>;
/** Returns true if this value is an object */
export declare function IsObject(value: unknown): value is Record<PropertyKey, unknown>;
/** Returns true if this value is string */
export declare function IsString(value: unknown): value is string;
/** Returns true if this value is symbol */
export declare function IsSymbol(value: unknown): value is symbol;
/** Returns true if this value is undefined */
export declare function IsUndefined(value: unknown): value is undefined;
export declare function IsEqual(left: unknown, right: unknown): boolean;
export declare function IsGreaterThan<Type extends number | bigint>(left: Type, right: Type): boolean;
export declare function IsLessThan<Type extends number | bigint>(left: Type, right: Type): boolean;
export declare function IsLessEqualThan<Type extends number | bigint>(left: Type, right: Type): boolean;
export declare function IsGreaterEqualThan<Type extends number | bigint>(left: Type, right: Type): boolean;
export declare function IsMultipleOf(dividend: bigint | number, divisor: bigint | number): boolean;
/** Returns true if the value appears to be an instance of a class. */
export declare function IsClassInstance(value: unknown): boolean;
export declare function IsValueLike(value: unknown): value is bigint | boolean | null | number | string | undefined;
/** Returns the number of Unicode Grapheme Clusters */
export declare function StringGraphemeCount(value: string): number;
export declare function Every<T>(value: T[], offset: number, callback: (value: T, index: number) => boolean): boolean;
export declare function EveryAll<T>(value: T[], offset: number, callback: (value: T, index: number) => boolean): boolean;
/** Returns true if this value has this property key */
export declare function HasPropertyKey<Key extends PropertyKey>(value: object, key: Key): value is {
    [_ in Key]: unknown;
};
/** Returns object entries as `[RegExp, Value][]` */
export declare function EntriesRegExp<Value extends unknown = unknown>(value: Record<PropertyKey, Value>): [RegExp, Value][];
/** Returns object entries as `[string, Value][]` */
export declare function Entries<Value extends unknown = unknown>(value: Record<PropertyKey, Value>): [string, Value][];
/** Returns the property keys for this object via `Object.getOwnPropertyKeys({ ... })` */
export declare function Keys(value: Record<PropertyKey, unknown>): string[];
/** Returns the property keys for this object via `Object.getOwnPropertyKeys({ ... })` */
export declare function Symbols(value: Record<PropertyKey, unknown>): symbol[];
/** Returns the property values for the given object via `Object.values()` */
export declare function Values(value: Record<PropertyKey, unknown>): unknown[];
/** Tests values for deep equality */
export declare function IsDeepEqual(left: unknown, right: unknown): boolean;
