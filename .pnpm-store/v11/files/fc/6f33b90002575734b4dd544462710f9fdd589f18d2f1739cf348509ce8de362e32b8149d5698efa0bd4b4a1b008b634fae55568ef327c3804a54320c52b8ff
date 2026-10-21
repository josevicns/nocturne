import type { Static, TProperties, TSchema } from '../../type/index.mjs';
/** Checks a value matches the provided type. */
export declare function Check<const Type extends TSchema, Result extends unknown = Static<Type>>(type: Type, value: unknown): value is Result;
/** Checks a value matches the provided type. */
export declare function Check<Context extends TProperties, const Type extends TSchema, Result extends unknown = Static<Type, Context>>(context: Context, type: Type, value: unknown): value is Result;
