import { type TSchema } from '../../types/index.mjs';
import { type TLiteral } from '../../types/literal.mjs';
import { type TEnum, type TEnumValue } from '../../types/enum.mjs';
import { type TTemplateLiteral } from '../../types/template-literal.mjs';
import { type TUnion } from '../../types/union.mjs';
import { type TEnumValuesToVariants } from '../enum/index.mjs';
import { type TTemplateLiteralDecode } from '../template-literal/decode.mjs';
type TFromTemplateLiteral<Pattern extends string, Decoded extends TSchema = TTemplateLiteralDecode<Pattern>, Result extends TSchema = TFromType<Decoded>> = Result;
type TFromUnion<Types extends TSchema[], Result extends TSchema[] = []> = (Types extends [infer Left extends TSchema, ...infer Right extends TSchema[]] ? TFromUnion<Right, [...Result, ...TFromType<Left>]> : Result);
type TFromType<Type extends TSchema, Result extends TSchema[] = (Type extends TEnum<infer Values extends TEnumValue[]> ? TFromUnion<TEnumValuesToVariants<Values>> : Type extends TLiteral<string | number> ? [Type] : Type extends TTemplateLiteral<infer Pattern extends string> ? TFromTemplateLiteral<Pattern> : Type extends TUnion<infer Types extends TSchema[]> ? TFromUnion<Types> : [
])> = Result;
export type TMappedKeys<Type extends TSchema, Result extends TSchema[] = TFromType<Type>> = Result;
export declare function MappedKeys<Type extends TSchema>(type: Type): TMappedKeys<Type>;
export {};
