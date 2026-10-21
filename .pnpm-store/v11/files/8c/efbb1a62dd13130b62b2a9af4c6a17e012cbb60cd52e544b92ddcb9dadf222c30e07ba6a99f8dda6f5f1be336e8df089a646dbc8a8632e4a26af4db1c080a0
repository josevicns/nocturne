// deno-coverage-ignore-start - parsebox tested
// deno-fmt-ignore-file
import { IsResult } from './internal/result.mjs';
import { Take } from './internal/take.mjs';
import { Trim } from './internal/trim.mjs';
import { Span } from './span.mjs';
function TakeInitial(quotes, input) {
    return Take(quotes, input);
}
function TakeSpan(quote, input) {
    return Span(quote, quote, false, input);
}
function TakeString(quotes, input) {
    const initial = TakeInitial(quotes, input);
    return (IsResult(initial)
        ? TakeSpan(initial[0], `${initial[0]}${initial[1]}`)
        : [] // fail: did not match Initial
    );
}
/** Matches a literal String with the given quotes */
export function String(quotes, input) {
    return TakeString(quotes, Trim(input));
}
// deno-coverage-ignore-stop
