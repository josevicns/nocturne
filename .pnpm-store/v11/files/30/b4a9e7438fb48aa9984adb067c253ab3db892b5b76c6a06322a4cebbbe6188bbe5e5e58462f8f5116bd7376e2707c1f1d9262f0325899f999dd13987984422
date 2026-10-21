import { type TSchema } from './schema.mjs';
import { type XGuard, type XGuardInterface } from '../../schema/types/index.mjs';
export type StaticBase<Value extends unknown> = Value;
/** Base class for creating extension types. */
export declare class Base<Value extends unknown = unknown> implements TSchema, XGuard<Value> {
    readonly '~kind': 'Base';
    readonly '~guard': XGuardInterface<Value>;
    constructor();
    /** Checks a value or returns false if invalid */
    Check(value: unknown): value is Value;
    /** Returns errors for a value. Return an empty array if valid.  */
    Errors(value: unknown): object[];
    /** Converts a value into this type */
    Convert(value: unknown): unknown;
    /** Cleans a value according to this type */
    Clean(value: unknown): unknown;
    /** Returns a default value for this type */
    Default(value: unknown): unknown;
    /** Creates a new instance of this type */
    Create(): Value;
    /** Clones this type  */
    Clone(): Base;
}
/** Returns true if the given value is a Base type. */
export declare function IsBase(value: unknown): value is Base;
