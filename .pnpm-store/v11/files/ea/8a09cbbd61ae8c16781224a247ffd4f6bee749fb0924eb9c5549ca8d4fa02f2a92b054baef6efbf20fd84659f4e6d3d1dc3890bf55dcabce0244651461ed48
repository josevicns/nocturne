// deno-fmt-ignore-file
// deno-lint-ignore-file
import { Guard } from '../../../guard/index.mjs';
import { Ok, Fail } from './try-result.mjs';
// ------------------------------------------------------------------
// BigInt
// ------------------------------------------------------------------
function FromBigInt(value) {
    return Guard.IsEqual(value, BigInt(0)) ? Ok(null) : Fail();
}
// ------------------------------------------------------------------
// Boolean
// ------------------------------------------------------------------
function FromBoolean(value) {
    return Guard.IsEqual(value, false) ? Ok(null) : Fail();
}
// ------------------------------------------------------------------
// Number
// ------------------------------------------------------------------
function FromNumber(value) {
    return Guard.IsEqual(value, 0) ? Ok(null) : Fail();
}
// ------------------------------------------------------------------
// Null
// ------------------------------------------------------------------
// deno-coverage-ignore-start - unreachable | guarded
function FromNull(value) {
    return Ok(null);
}
// deno-coverage-ignore-stop
// ------------------------------------------------------------------
// String
// ------------------------------------------------------------------
function FromString(value) {
    const lowercase = value.toLowerCase();
    const predicate = Guard.IsEqual(lowercase, 'undefined')
        || Guard.IsEqual(lowercase, 'null')
        || Guard.IsEqual(value, '')
        || Guard.IsEqual(value, '0');
    return predicate ? Ok(null) : Fail();
}
// ------------------------------------------------------------------
// Undefined
// ------------------------------------------------------------------
function FromUndefined(value) {
    return Ok(null);
}
// ------------------------------------------------------------------
// Try
// ------------------------------------------------------------------
// deno-coverage-ignore-start - unreachable | guarded
export function TryNull(value) {
    return (Guard.IsBigInt(value) ? FromBigInt(value) :
        Guard.IsBoolean(value) ? FromBoolean(value) :
            Guard.IsNumber(value) ? FromNumber(value) :
                Guard.IsNull(value) ? FromNull(value) :
                    Guard.IsString(value) ? FromString(value) :
                        Guard.IsUndefined(value) ? FromUndefined(value) :
                            Fail());
}
// deno-coverage-ignore-stop
