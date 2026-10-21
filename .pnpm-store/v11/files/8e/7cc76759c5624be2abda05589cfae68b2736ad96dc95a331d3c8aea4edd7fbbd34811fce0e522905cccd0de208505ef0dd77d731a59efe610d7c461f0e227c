import { type TLocalizedValidationError } from '../../error/errors.mjs';
import { type TProperties, type TSchema, type StaticDecode } from '../../type/index.mjs';
import { AssertError } from '../assert/index.mjs';
export declare class DecodeError extends AssertError {
    constructor(value: unknown, errors: TLocalizedValidationError[]);
}
/** Executes Decode callbacks only */
export declare function DecodeUnsafe(context: TProperties, type: TSchema, value: unknown): unknown;
/**
 * Decodes a value against the given type by applying a sequence of Clone,
 * Default, Convert, and Clone operations, then executing any embedded Decode
 * callbacks. If the processing sequence fails to produce a value matching the
 * provided type, a DecodeError is thrown.
 */
export declare function Decode<const Type extends TSchema, Result extends unknown = StaticDecode<Type>>(type: Type, value: unknown): Result;
/**
 * Decodes a value against the given type by applying a sequence of Clone,
 * Default, Convert, and Clone operations, then executing any embedded Decode
 * callbacks. If the processing sequence fails to produce a value matching the
 * provided type, a DecodeError is thrown.
 */
export declare function Decode<Context extends TProperties, const Type extends TSchema, Result extends unknown = StaticDecode<Type, Context>>(context: Context, type: Type, value: unknown): Result;
