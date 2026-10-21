// deno-coverage-ignore-start - parsebox tested
// deno-fmt-ignore-file
import { IsResult } from './result.mjs';
import { Take } from './take.mjs';
function IsDiscard(discard, input) {
    return discard.includes(input);
}
/** Takes characters from the Input until no-match. The Discard set is used to omit characters from the match */
export function Many(allowed, discard, input, result = '') {
    const takeResult = Take(allowed, input);
    return (IsResult(takeResult)
        ? IsDiscard(discard, takeResult[0])
            ? Many(allowed, discard, takeResult[1], result)
            : Many(allowed, discard, takeResult[1], `${result}${takeResult[0]}`)
        : [result, input]);
}
// deno-coverage-ignore-stop
