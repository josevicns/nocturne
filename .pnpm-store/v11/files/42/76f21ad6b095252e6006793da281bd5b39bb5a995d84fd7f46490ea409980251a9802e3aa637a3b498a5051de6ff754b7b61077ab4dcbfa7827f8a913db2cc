// deno-fmt-ignore-file
import { Settings } from '../../system/settings/index.mjs';
import { IsKind } from './schema.mjs';
// ------------------------------------------------------------------
// Type.Base<...>
// ------------------------------------------------------------------
function BaseProperty(value) {
    return {
        enumerable: Settings.Get().enumerableKind,
        writable: false,
        configurable: false,
        value
    };
}
/** Base class for creating extension types. */
export class Base {
    constructor() {
        globalThis.Object.defineProperty(this, '~kind', BaseProperty('Base'));
        globalThis.Object.defineProperty(this, '~guard', BaseProperty({
            check: (value) => this.Check(value),
            errors: (value) => this.Errors(value)
        }));
    }
    /** Checks a value or returns false if invalid */
    Check(value) {
        return true;
    }
    /** Returns errors for a value. Return an empty array if valid.  */
    Errors(value) {
        return [];
    }
    /** Converts a value into this type */
    Convert(value) {
        return value;
    }
    /** Cleans a value according to this type */
    Clean(value) {
        return value;
    }
    /** Returns a default value for this type */
    Default(value) {
        return value;
    }
    /** Creates a new instance of this type */
    Create() {
        throw new Error('Create not implemented');
    }
    /** Clones this type  */
    Clone() {
        throw Error('Clone not implemented');
    }
}
// ------------------------------------------------------------------
// Guard
// ------------------------------------------------------------------
/** Returns true if the given value is a Base type. */
export function IsBase(value) {
    return IsKind(value, 'Base');
}
