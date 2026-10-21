// deno-fmt-ignore-file
// deno-lint-ignore-file
import { Guard } from '../../../guard/index.mjs';
import { Ok, Fail } from './try-result.mjs';
// ------------------------------------------------------------------
// BigInt
// ------------------------------------------------------------------
function FromBigInt(value) {
    return Ok(value.toString());
}
// ------------------------------------------------------------------
// Boolean
// ------------------------------------------------------------------
function FromBoolean(value) {
    return Ok(value.toString());
}
// ------------------------------------------------------------------
// Number
// ------------------------------------------------------------------
function FromNumber(value) {
    return Ok(value.toString());
}
// ------------------------------------------------------------------
// Null
// ------------------------------------------------------------------
function FromNull(value) {
    return Ok('null');
}
// ------------------------------------------------------------------
// String
// ------------------------------------------------------------------
// deno-coverage-ignore-start - unreachable | guarded
function FromString(value) {
    return Ok(value);
}
// deno-coverage-ignore-stop
// ------------------------------------------------------------------
// Undefined
// ------------------------------------------------------------------
function FromUndefined(value) {
    return Ok('');
}
// ------------------------------------------------------------------
// Try
// ------------------------------------------------------------------
// deno-coverage-ignore-start - unreachable | guarded
export function TryString(value) {
    return (Guard.IsBigInt(value) ? FromBigInt(value) :
        Guard.IsBoolean(value) ? FromBoolean(value) :
            Guard.IsNumber(value) ? FromNumber(value) :
                Guard.IsNull(value) ? FromNull(value) :
                    Guard.IsString(value) ? FromString(value) :
                        Guard.IsUndefined(value) ? FromUndefined(value) :
                            Fail());
}
// deno-coverage-ignore-stop
