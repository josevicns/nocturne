import { type TTrim } from './internal/trim.mjs';
import { type TTake } from './internal/take.mjs';
import { type TMany } from './internal/many.mjs';
import { type TOptional } from './internal/optional.mjs';
import { type TDigit } from './internal/char.mjs';
import { type THyphen } from './internal/char.mjs';
import { type TZero } from './internal/char.mjs';
import { type TNonZero } from './internal/char.mjs';
import { type TUnderScore } from './internal/char.mjs';
type TTakeSign<Input extends string> = (TOptional<THyphen, Input>);
type TTakeNonZero<Input extends string> = (TTake<TNonZero, Input>);
type TAllowedDigits = [...TDigit, TUnderScore];
type TTakeDigits<Input extends string> = (TMany<TAllowedDigits, [TUnderScore], Input>);
type TTakeInteger<Input extends string> = (TTakeSign<Input> extends [infer Sign extends string, infer SignRest extends string] ? TTake<[TZero], SignRest> extends [infer Zero extends string, infer ZeroRest extends string] ? [`${Sign}${Zero}`, ZeroRest] : TTakeNonZero<SignRest> extends [infer NonZero extends string, infer NonZeroRest extends string] ? TTakeDigits<NonZeroRest> extends [infer Digits extends string, infer DigitsRest extends string] ? [`${Sign}${NonZero}${Digits}`, DigitsRest] : [] : [] : []);
/** Matches if next is a Integer */
export type TInteger<Input extends string> = (TTakeInteger<TTrim<Input>>);
/** Matches if next is a Integer */
export declare function Integer<Input extends string>(input: Input): TInteger<Input>;
export {};
