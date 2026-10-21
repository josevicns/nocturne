import { type TTrim } from './internal/trim.mjs';
import { type TNewLine } from './internal/char.mjs';
import { type TUntil } from './until.mjs';
type TMultiLine<Start extends string, End extends string, Input extends string> = (Input extends `${Start}${infer Rest extends string}` ? TUntil<[End], Rest> extends [infer Until extends string, infer UntilRest extends string] ? UntilRest extends `${End}${infer Rest extends string}` ? [`${Until}`, Rest] : [] : [] : []);
type TSingleLine<Start extends string, End extends string, Input extends string> = (Input extends `${Start}${infer Rest extends string}` ? TUntil<[TNewLine, End], Rest> extends [infer Until extends string, infer UntilRest extends string] ? UntilRest extends `${End}${infer EndRest extends string}` ? [`${Until}`, EndRest] : [] : [] : []);
/** Matches from Start and End capturing everything in-between. Start and End are consumed. */
export type TSpan<Start extends string, End extends string, MultiLine extends boolean, Input extends string> = (MultiLine extends true ? TMultiLine<Start, End, TTrim<Input>> : TSingleLine<Start, End, TTrim<Input>>);
/** Matches from Start and End capturing everything in-between. Start and End are consumed. */
export declare function Span<Start extends string, End extends string, MultiLine extends boolean, Input extends string>(start: Start, end: End, multiLine: MultiLine, input: Input): TSpan<Start, End, MultiLine, Input>;
export {};
