// deno-coverage-ignore-start - parsebox tested
// deno-fmt-ignore-file
import { IsResult } from './result.mjs';
import { Take } from './take.mjs';
/** Matches the given Value or empty string if no match. This function never fails */
export function Optional(value, input) {
    const result = Take([value], input);
    return (IsResult(result)
        ? result
        : ['', input]);
}
// deno-coverage-ignore-stop
