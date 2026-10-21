import { type TTrim } from './internal/trim.mjs';
import { type TTake } from './internal/take.mjs';
import { type TMany } from './internal/many.mjs';
import { type TOptional } from './internal/optional.mjs';
import { type TDigit, TUnderScore } from './internal/char.mjs';
import { type TDot } from './internal/char.mjs';
import { type THyphen } from './internal/char.mjs';
import { type TInteger } from './integer.mjs';
type TAllowedDigits = [...TDigit, TUnderScore];
type TTakeSign<Input extends string> = (TOptional<THyphen, Input>);
type TIsLeadingDot<Input extends string> = (TTake<[TDot], Input> extends [string, string] ? true : false);
type TTakeFractional<Input extends string> = (TMany<TAllowedDigits, [TUnderScore], Input> extends [infer Digits extends string, infer Rest extends string] ? Digits extends '' ? [] : [Digits, Rest] : []);
type TLeadingDot<Sign extends string, Input extends string> = (TTake<[TDot], Input> extends [infer Dot extends string, infer Rest extends string] ? TTakeFractional<Rest> extends [infer Fractional extends string, infer Rest extends string] ? [`${Sign}0${Dot}${Fractional}`, Rest] : [] : []);
type TLeadingInteger<Sign extends string, Input extends string> = (TInteger<Input> extends [infer Integer extends string, infer IntegerRest extends string] ? TTake<[TDot], IntegerRest> extends [infer Dot extends string, infer DotRest extends string] ? TTakeFractional<DotRest> extends [infer Fractional extends string, infer FractionalRest extends string] ? [`${Sign}${Integer}${Dot}${Fractional}`, FractionalRest] : [`${Sign}${Integer}`, DotRest] : [`${Sign}${Integer}`, IntegerRest] : []);
type TTakeNumber<Input extends string> = (TTakeSign<Input> extends [infer Sign extends string, infer SignRest extends string] ? TIsLeadingDot<SignRest> extends true ? TLeadingDot<Sign, SignRest> : TLeadingInteger<Sign, SignRest> : []);
/** Matches if next is a literal Number */
export type TNumber<Input extends string> = (TTakeNumber<TTrim<Input>>);
/** Matches if next is a literal Number */
export declare function Number<Input extends string>(input: Input): TNumber<Input>;
export {};
