import { type TLocalizedValidationError } from '../../error/errors.mjs';
import { type TProperties, type TSchema, type StaticParse } from '../../type/index.mjs';
import { AssertError } from '../assert/index.mjs';
export declare class ParseError extends AssertError {
    constructor(value: unknown, errors: TLocalizedValidationError[]);
}
export declare const Parser: import("../pipeline/pipeline.mjs").PipelineInterface;
/**
 * Parses a value with the given type. The function will Check the value and return
 * early if it matches the provided type. If the value does not match, it is processed
 * through a sequence of Clone, Default, Convert, and Clean operations and checked again.
 * A `ParseError` is thrown if the value fails to match after the processing sequence.
 */
export declare function Parse<const Type extends TSchema, Result extends unknown = StaticParse<Type>>(type: Type, value: unknown): Result;
/**
 * Parses a value with the given type. The function will Check the value and return
 * early if it matches the provided type. If the value does not match, it is processed
 * through a sequence of Clone, Default, Convert, and Clean operations and checked again.
 * A `ParseError` is thrown if the value fails to match after the processing sequence.
 */
export declare function Parse<Context extends TProperties, const Type extends TSchema, Result extends unknown = StaticParse<Type, Context>>(context: Context, type: Type, value: unknown): Result;
