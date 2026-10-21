// deno-fmt-ignore-file
// deno-lint-ignore-file
import { Guard } from '../../../guard/index.mjs';
import { Ok, Fail, IsOk } from './try-result.mjs';
// ------------------------------------------------------------------
// Two-Phase
// ------------------------------------------------------------------
import { TryBigInt } from './try-bigint.mjs';
// ------------------------------------------------------------------
// BigInt
// ------------------------------------------------------------------
const maxBigInt = BigInt(Number.MAX_SAFE_INTEGER);
const minBigInt = BigInt(Number.MIN_SAFE_INTEGER);
function CanBigIntDowncast(value) {
    return (value <= maxBigInt && value >= minBigInt);
}
function FromBigInt(value) {
    return CanBigIntDowncast(value) ? Ok(Number(value)) : Fail();
}
// ------------------------------------------------------------------
// Boolean
// ------------------------------------------------------------------
function FromBoolean(value) {
    return value ? Ok(1) : Ok(0);
}
// ------------------------------------------------------------------
// Number
// ------------------------------------------------------------------
// deno-coverage-ignore-start - unreachable | guarded
function FromNumber(value) {
    return Ok(value);
}
// deno-coverage-ignore-stop
// ------------------------------------------------------------------
// Null
// ------------------------------------------------------------------
function FromNull(value) {
    return Ok(0);
}
// ------------------------------------------------------------------
// String
// ------------------------------------------------------------------
function FromString(value) {
    const coerced = +value;
    if (Guard.IsNumber(coerced))
        return Ok(coerced);
    const lowercase = value.toLowerCase();
    if (Guard.IsEqual(lowercase, 'false'))
        return Ok(0);
    if (Guard.IsEqual(lowercase, 'true'))
        return Ok(1);
    const result = TryBigInt(value);
    if (IsOk(result))
        return FromBigInt(result.value);
    return Fail();
}
// ------------------------------------------------------------------
// Undefined
// ------------------------------------------------------------------
function FromUndefined(value) {
    return Ok(0);
}
// ------------------------------------------------------------------
// Try
// ------------------------------------------------------------------
// deno-coverage-ignore-start - unreachable | guarded
export function TryNumber(value) {
    return (Guard.IsBigInt(value) ? FromBigInt(value) :
        Guard.IsBoolean(value) ? FromBoolean(value) :
            Guard.IsNumber(value) ? FromNumber(value) :
                Guard.IsNull(value) ? FromNull(value) :
                    Guard.IsString(value) ? FromString(value) :
                        Guard.IsUndefined(value) ? FromUndefined(value) :
                            Fail());
}
// deno-coverage-ignore-stop
