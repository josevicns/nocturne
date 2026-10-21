// deno-coverage-ignore-start - parsebox tested
// deno-fmt-ignore-file
import { IsResult } from './internal/result.mjs';
import { Take } from './internal/take.mjs';
import { Integer } from './integer.mjs';
function TakeBigInt(input) {
    const integer = Integer(input);
    return (IsResult(integer) ? (() => {
        const n = Take(['n'], integer[1]);
        return IsResult(n)
            ? [`${integer[0]}`, n[1]]
            : []; // fail: did not match 'n'
    })() : [] // fail: did not match Integer
    );
}
/** Matches if next is a Integer literal with trailing 'n'. Trailing 'n' is omitted in result. */
export function BigInt(input) {
    return TakeBigInt(input);
}
// deno-coverage-ignore-stop
