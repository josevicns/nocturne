import type { TProperties, TSchema, Static } from '../../type/index.mjs';
/** Creates a value from the provided type. This function will use `default` annotations if present. */
export declare function Create<const Type extends TSchema, Result extends unknown = Static<Type>>(type: Type): Result;
/** Creates a value from the provided type. This function will use `default` annotations if present. */
export declare function Create<const Context extends TProperties, Type extends TSchema, Result extends unknown = Static<Type, Context>>(context: Context, type: Type): Result;
