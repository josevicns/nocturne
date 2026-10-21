// deno-coverage-ignore-start - parsebox tested
// deno-fmt-ignore-file
import { IsResult } from './internal/result.mjs';
import { Trim } from './internal/trim.mjs';
import { Take } from './internal/take.mjs';
import { Alpha } from './internal/char.mjs';
import { Digit } from './internal/char.mjs';
import { UnderScore } from './internal/char.mjs';
import { DollarSign } from './internal/char.mjs';
const Initial = [...Alpha, UnderScore, DollarSign];
function TakeInitial(input) {
    return Take(Initial, input);
}
const Remaining = [...Initial, ...Digit];
function TakeRemaining(input, result = '') {
    const remaining = Take(Remaining, input);
    return (IsResult(remaining)
        ? TakeRemaining(remaining[1], `${result}${remaining[0]}`)
        : [result, input]);
}
function TakeIdent(input) {
    const initial = TakeInitial(input);
    return (IsResult(initial) ? (() => {
        const remaining = TakeRemaining(initial[1]);
        return IsResult(remaining)
            ? [`${initial[0]}${remaining[0]}`, remaining[1]]
            : []; // fail: did not match Remaining
    })() : [] // fail: did not match Initial
    );
}
/** Matches if next is an Ident */
export function Ident(input) {
    return TakeIdent(Trim(input));
}
// deno-coverage-ignore-stop
