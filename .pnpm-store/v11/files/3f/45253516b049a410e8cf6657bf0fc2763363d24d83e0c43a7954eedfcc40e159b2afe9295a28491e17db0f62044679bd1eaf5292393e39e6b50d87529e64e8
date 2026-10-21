// deno-coverage-ignore-start - parsebox tested
// deno-fmt-ignore-file
import { IsEqual, IsString } from './internal/guard.mjs';
function IsEnd(end, input) {
    const [left, ...right] = end;
    return (IsString(left)
        ? input.startsWith(left)
            ? true
            : IsEnd(right, input)
        : false);
}
/** Match Input until but not including End. No match if End not found. */
export function Until(end, input, result = '') {
    return (IsEqual(input, '')
        ? [] // fail: Input is empty
        : IsEnd(end, input) ? [result, input] : (() => {
            const [left, right] = [input.slice(0, 1), input.slice(1)];
            return Until(end, right, `${result}${left}`);
        })());
}
// deno-coverage-ignore-stop
