import { type TLocalizedValidationError } from '../../error/errors.mjs';
import { type TProperties, type TSchema, type StaticEncode } from '../../type/index.mjs';
import { AssertError } from '../assert/index.mjs';
export declare class EncodeError extends AssertError {
    constructor(value: unknown, errors: TLocalizedValidationError[]);
}
/** Executes Encode callbacks only */
export declare function EncodeUnsafe(context: TProperties, type: TSchema, value: unknown): unknown;
/** Encodes a value. */
export declare function Encode<const Type extends TSchema, Result extends unknown = StaticEncode<Type>>(type: Type, value: unknown): Result;
/** Encodes a value. */
export declare function Encode<Context extends TProperties, const Type extends TSchema, Result extends unknown = StaticEncode<Type, Context>>(context: Context, type: Type, value: unknown): Result;
