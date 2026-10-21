// deno-coverage-ignore-start - parsebox tested
// deno-fmt-ignore-file
import { IsResult } from './internal/result.mjs';
import { Trim } from './internal/trim.mjs';
import { Take } from './internal/take.mjs';
import { Many } from './internal/many.mjs';
import { Optional } from './internal/optional.mjs';
import { Digit } from './internal/char.mjs';
import { Hyphen } from './internal/char.mjs';
import { Zero } from './internal/char.mjs';
import { NonZero } from './internal/char.mjs';
import { UnderScore } from './internal/char.mjs';
function TakeSign(input) {
    return Optional(Hyphen, input);
}
function TakeNonZero(input) {
    return Take(NonZero, input);
}
const AllowedDigits = [...Digit, UnderScore];
function TakeDigits(input) {
    return Many(AllowedDigits, [UnderScore], input);
}
function TakeInteger(input) {
    const sign = TakeSign(input);
    return (IsResult(sign) ? (() => {
        const zero = Take([Zero], sign[1]);
        return IsResult(zero)
            ? [`${sign[0]}${zero[0]}`, zero[1]]
            : (() => {
                const nonZero = TakeNonZero(sign[1]);
                return IsResult(nonZero) ? (() => {
                    const digits = TakeDigits(nonZero[1]);
                    return IsResult(digits)
                        ? [`${sign[0]}${nonZero[0]}${digits[0]}`, digits[1]]
                        : []; // fail: did not match Digits
                })() : []; // fail: did not match NonZero
            })();
    })() : [] // fail: did not match Sign
    );
}
/** Matches if next is a Integer */
export function Integer(input) {
    return TakeInteger(Trim(input));
}
// deno-coverage-ignore-stop
