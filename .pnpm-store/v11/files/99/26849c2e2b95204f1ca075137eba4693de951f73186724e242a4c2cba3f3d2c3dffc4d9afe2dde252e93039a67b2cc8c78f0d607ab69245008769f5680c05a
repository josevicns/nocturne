// deno-fmt-ignore-file
// deno-lint-ignore-file
import { Guard } from '../../../guard/index.mjs';
import { Ok, Fail } from './try-result.mjs';
// ------------------------------------------------------------------
// BigInt
// ------------------------------------------------------------------
function FromBigInt(value) {
    return (Guard.IsEqual(value, BigInt(0)) ? Ok(false) :
        Guard.IsEqual(value, BigInt(1)) ? Ok(true) :
            Fail());
}
// ------------------------------------------------------------------
// Boolean
// ------------------------------------------------------------------
// deno-coverage-ignore-start - unreachable | guarded
function FromBoolean(value) {
    return Ok(value);
}
// deno-coverage-ignore-stop
// ------------------------------------------------------------------
// Number
// ------------------------------------------------------------------
function FromNumber(value) {
    return (Guard.IsEqual(value, 0) ? Ok(false) :
        Guard.IsEqual(value, 1) ? Ok(true) :
            Fail());
}
// ------------------------------------------------------------------
// Null
// ------------------------------------------------------------------
function FromNull(value) {
    return Ok(false);
}
// ------------------------------------------------------------------
// String
// ------------------------------------------------------------------
function FromString(value) {
    return (Guard.IsEqual(value.toLowerCase(), 'false') ? Ok(false) :
        Guard.IsEqual(value.toLowerCase(), 'true') ? Ok(true) :
            Guard.IsEqual(value, '0') ? Ok(false) :
                Guard.IsEqual(value, '1') ? Ok(true) :
                    Fail());
}
// ------------------------------------------------------------------
// Undefined
// ------------------------------------------------------------------
function FromUndefined(value) {
    return Ok(false);
}
// ------------------------------------------------------------------
// Try
// ------------------------------------------------------------------
// deno-coverage-ignore-start - unreachable | guarded
export function TryBoolean(value) {
    return (Guard.IsBigInt(value) ? FromBigInt(value) :
        Guard.IsBoolean(value) ? FromBoolean(value) :
            Guard.IsNumber(value) ? FromNumber(value) :
                Guard.IsNull(value) ? FromNull(value) :
                    Guard.IsString(value) ? FromString(value) :
                        Guard.IsUndefined(value) ? FromUndefined(value) :
                            Fail());
}
// deno-coverage-ignore-stop
