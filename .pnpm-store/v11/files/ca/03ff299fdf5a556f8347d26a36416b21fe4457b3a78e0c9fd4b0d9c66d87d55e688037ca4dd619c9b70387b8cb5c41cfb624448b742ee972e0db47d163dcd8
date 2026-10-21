// deno-coverage-ignore-start - parsebox tested
// deno-fmt-ignore-file
import { IsEqual } from './internal/guard.mjs';
import { IsResult } from './internal/result.mjs';
import { Until } from './until.mjs';
/** Match Input until but not including End. No match if End not found or match is zero-length. */
export function Until_1(end, input) {
    const until = Until(end, input);
    return (IsResult(until)
        ? IsEqual(until[0], '')
            ? [] // fail: match has no characters
            : until
        : [] // fail: did not match Until
    );
}
// deno-coverage-ignore-stop
