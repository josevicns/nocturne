// deno-coverage-ignore-start - parsebox tested
// deno-fmt-ignore-file
import { IsResult } from './internal/result.mjs';
import { Trim } from './internal/trim.mjs';
import { NewLine } from './internal/char.mjs';
import { Until } from './until.mjs';
function MultiLine(start, end, input) {
    return (input.startsWith(start) ? (() => {
        const until = Until([end], input.slice(start.length));
        return IsResult(until) ? (() => {
            return until[1].startsWith(end)
                ? [`${until[0]}`, until[1].slice(end.length)]
                : []; // fail: did not match End
        })() : []; // fail: did not match Until
    })() : [] // fail: did not match Start
    );
}
function SingleLine(start, end, input) {
    return (input.startsWith(start) ? (() => {
        const until = Until([NewLine, end], input.slice(start.length));
        return IsResult(until) ? (() => {
            return until[1].startsWith(end)
                ? [`${until[0]}`, until[1].slice(end.length)]
                : []; // fail: did not match End
        })() : []; // fail: did not match Until
    })() : [] // fail: not match Start
    );
}
/** Matches from Start and End capturing everything in-between. Start and End are consumed. */
export function Span(start, end, multiLine, input) {
    return (multiLine
        ? MultiLine(start, end, Trim(input))
        : SingleLine(start, end, Trim(input)));
}
// deno-coverage-ignore-stop
