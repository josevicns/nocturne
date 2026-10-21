import { type TUnreachable } from '../../../system/unreachable/index.mjs';
import { type TSchema } from '../../types/schema.mjs';
import { type TPattern } from '../../script/parser.mjs';
/** Parses a Pattern into a sequence of TemplateLiteral types */
export type TParsePatternIntoTypes<Pattern extends string, Parsed extends [TSchema[], string] | [] = TPattern<Pattern>, Result extends TSchema[] = Parsed extends [infer Types extends TSchema[], string] ? Types : TUnreachable> = Result;
/** Parses a Pattern into a sequence of TemplateLiteral types */
export declare function ParsePatternIntoTypes<Pattern extends string>(pattern: Pattern): TParsePatternIntoTypes<Pattern>;
