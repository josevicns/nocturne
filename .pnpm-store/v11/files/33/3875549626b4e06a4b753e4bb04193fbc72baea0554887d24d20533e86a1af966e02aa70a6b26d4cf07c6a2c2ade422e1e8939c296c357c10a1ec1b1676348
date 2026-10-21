// deno-coverage-ignore-start - parsebox tested
// deno-fmt-ignore-file
import { IsEqual } from './internal/guard.mjs';
import { IsResult } from './internal/result.mjs';
import { Trim } from './internal/trim.mjs';
import { Take } from './internal/take.mjs';
import { Many } from './internal/many.mjs';
import { Optional } from './internal/optional.mjs';
import { Digit, UnderScore } from './internal/char.mjs';
import { Dot } from './internal/char.mjs';
import { Hyphen } from './internal/char.mjs';
import { Integer } from './integer.mjs';
const AllowedDigits = [...Digit, UnderScore];
function TakeSign(input) {
    return Optional(Hyphen, input);
}
function IsLeadingDot(input) {
    return IsResult(Take([Dot], input));
}
function TakeFractional(input) {
    const digits = Many(AllowedDigits, [UnderScore], input);
    return (IsResult(digits)
        ? IsEqual(digits[0], '')
            ? [] // fail: no Digits
            : [digits[0], digits[1]]
        : [] // fail: did not match Digits
    );
}
function LeadingDot(sign, input) {
    const dot = Take([Dot], input);
    return (IsResult(dot) ? (() => {
        const fractional = TakeFractional(dot[1]);
        return IsResult(fractional)
            ? [`${sign}0${dot[0]}${fractional[0]}`, fractional[1]]
            : []; // fail: did not match Fractional
    })() : [] // fail: did not match Dot
    );
}
function LeadingInteger(sign, input) {
    const integer = Integer(input);
    return (IsResult(integer) ? (() => {
        const dot = Take([Dot], integer[1]);
        return IsResult(dot) ? (() => {
            const fractional = TakeFractional(dot[1]);
            return IsResult(fractional)
                ? [`${sign}${integer[0]}${dot[0]}${fractional[0]}`, fractional[1]]
                : [`${sign}${integer[0]}`, dot[1]]; // fail: did not match Fractional, use Integer
        })() : [`${sign}${integer[0]}`, integer[1]]; // fail: did not match Dot, use Integer
    })() : [] // fail: did not match Integer
    );
}
function TakeNumber(input) {
    const sign = TakeSign(input);
    return (IsResult(sign)
        ? IsLeadingDot(sign[1])
            ? LeadingDot(sign[0], sign[1])
            : LeadingInteger(sign[0], sign[1])
        : [] // fail: did not match Sign
    );
}
/** Matches if next is a literal Number */
export function Number(input) {
    return TakeNumber(Trim(input));
}
// deno-coverage-ignore-stop
