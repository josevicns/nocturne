// deno-fmt-ignore-file
// deno-lint-ignore-file
import { Guard } from '../../../guard/index.mjs';
import { Ok, Fail } from './try-result.mjs';
// ------------------------------------------------------------------
// BigInt
// ------------------------------------------------------------------
function FromBigInt(value) {
    return Guard.IsEqual(value, BigInt(0)) ? Ok(undefined) : Fail();
}
// ------------------------------------------------------------------
// Boolean
// ------------------------------------------------------------------
function FromBoolean(value) {
    return Guard.IsEqual(value, false) ? Ok(undefined) : Fail();
}
// ------------------------------------------------------------------
// Number
// ------------------------------------------------------------------
function FromNumber(value) {
    return Guard.IsEqual(value, 0) ? Ok(undefined) : Fail();
}
// ------------------------------------------------------------------
// Null
// ------------------------------------------------------------------
function FromNull(value) {
    return Ok(undefined);
}
// ------------------------------------------------------------------
// String
// ------------------------------------------------------------------
function FromString(value) {
    const lowercase = value.toLowerCase();
    const predicate = Guard.IsEqual(lowercase, 'undefined')
        || Guard.IsEqual(lowercase, 'null')
        || Guard.IsEqual(value, '')
        || Guard.IsEqual(value, '0');
    return predicate ? Ok(undefined) : Fail();
}
// ------------------------------------------------------------------
// Undefined
// ------------------------------------------------------------------
// deno-coverage-ignore-start - unreachable | guarded
function FromUndefined(value) {
    return Ok(undefined);
}
// deno-coverage-ignore-stop
// ------------------------------------------------------------------
// Try
// ------------------------------------------------------------------
// deno-coverage-ignore-start - unreachable | guarded
export function TryUndefined(value) {
    return (Guard.IsBigInt(value) ? FromBigInt(value) :
        Guard.IsBoolean(value) ? FromBoolean(value) :
            Guard.IsNumber(value) ? FromNumber(value) :
                Guard.IsNull(value) ? FromNull(value) :
                    Guard.IsString(value) ? FromString(value) :
                        Guard.IsUndefined(value) ? FromUndefined(value) :
                            Fail());
}
// deno-coverage-ignore-stop
