import { TUnreachable } from '../../../system/unreachable/index.mjs';
import { type TSchema } from '../../types/schema.mjs';
import { type TUnion } from '../../types/union.mjs';
import { type TString } from '../../types/string.mjs';
import { type TLiteral, type TLiteralValue } from '../../types/literal.mjs';
import { type TParsePatternIntoTypes } from '../patterns/pattern.mjs';
import { type TTemplateLiteralFinite } from './finite.mjs';
type TFromLiteralPush<Variants extends string[], Value extends TLiteralValue, Result extends string[] = []> = Variants extends [infer Left extends string, ...infer Right extends string[]] ? TFromLiteralPush<Right, Value, [...Result, `${Left}${Value}`]> : Result;
type TFromLiteral<Variants extends string[], Value extends TLiteralValue> = Variants extends [] ? [`${Value}`] : TFromLiteralPush<Variants, Value>;
type TFromUnion<Variants extends string[], Types extends TSchema[], Result extends string[] = []> = Types extends [infer Left extends TSchema, ...infer Right extends TSchema[]] ? TFromUnion<Variants, Right, [...Result, ...TFromType<Variants, Left>]> : Result;
type TFromType<Variants extends string[], Type extends TSchema, Result extends string[] = (Type extends TUnion<infer Types extends TSchema[]> ? TFromUnion<Variants, Types> : Type extends TLiteral<infer Value extends TLiteralValue> ? TFromLiteral<Variants, Value> : TUnreachable)> = Result;
type TDecodeFromSpan<Variants extends string[], Types extends TSchema[]> = Types extends [infer Left extends TSchema, ...infer Right extends TSchema[]] ? TDecodeFromSpan<TFromType<Variants, Left>, Right> : Variants;
type TVariantsToLiterals<Variants extends string[], Result extends TSchema[] = []> = Variants extends [infer Left extends string, ...infer Right extends string[]] ? TVariantsToLiterals<Right, [...Result, TLiteral<Left>]> : Result;
type TDecodeTypesAsUnion<Types extends TSchema[], Variants extends string[] = TDecodeFromSpan<[], Types>, Literals extends TSchema[] = TVariantsToLiterals<Variants>, Result extends TSchema = TUnion<Literals>> = Result;
type TDecodeTypes<Types extends TSchema[], Result extends TSchema = (Types extends [] ? TUnreachable : Types extends [infer Type extends TLiteral] ? Type : TDecodeTypesAsUnion<Types>)> = Result;
/** Decodes a TemplateLiteral into a Type. If the TemplateLiteral yields a non-finite set, the return value is TString */
export type TTemplateLiteralDecode<Pattern extends string, Types extends TSchema[] = TParsePatternIntoTypes<Pattern>, Finite extends boolean = TTemplateLiteralFinite<Types>, Result extends TSchema = (Finite extends true ? TDecodeTypes<Types> : TString)> = Result;
/** Decodes a TemplateLiteral into a Type. If the TemplateLiteral yields a non-finite set, the return value is TString */
export declare function TemplateLiteralDecode<Pattern extends string>(pattern: Pattern): TTemplateLiteralDecode<Pattern>;
export {};
