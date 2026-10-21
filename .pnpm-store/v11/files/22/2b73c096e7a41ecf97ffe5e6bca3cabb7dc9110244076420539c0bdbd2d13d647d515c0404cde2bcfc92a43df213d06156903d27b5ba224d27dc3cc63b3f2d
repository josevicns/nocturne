import type { TLocalizedValidationError } from '../../error/index.mjs';
import type { Static, TProperties, TSchema } from '../../type/index.mjs';
export declare class AssertError extends Error {
    readonly cause: {
        source: string;
        errors: TLocalizedValidationError[];
        value: unknown;
    };
    constructor(source: string, value: unknown, errors: TLocalizedValidationError[]);
}
/** Asserts the a value matches the given type. This function returns a TypeScript type asserts predicate and will throw AssertError if value does not match. */
export declare function Assert<Context extends TProperties, const Type extends TSchema, Result extends unknown = Static<Type, Context>>(context: Context, type: Type, value: unknown): asserts value is Result;
/** Asserts the a value matches the given type. This function returns a TypeScript type asserts predicate and will throw AssertError if value does not match. */
export declare function Assert<const Type extends TSchema, Result extends unknown = Static<Type>>(type: Type, value: unknown): asserts value is Result;
