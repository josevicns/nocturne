import { type TSchema } from '../../types/schema.mjs';
import { type TIntersect } from '../../types/intersect.mjs';
import { type TUnion } from '../../types/union.mjs';
import { type TObject } from '../../types/object.mjs';
import { type TTuple } from '../../types/tuple.mjs';
import { type TComposite } from './composite.mjs';
import { type TNarrow } from './narrow.mjs';
import { type TEvaluateType } from "./evaluate.mjs";
import { type TEvaluateIntersect } from "./evaluate.mjs";
type TCanDistribute<Type extends TSchema> = Type extends TObject | TTuple ? true : false;
type TDistributeNormalize<Type extends TSchema> = Type extends TIntersect<infer Types extends TSchema[]> ? TEvaluateIntersect<Types> : Type;
type TDistributeOperation<Left extends TSchema, Right extends TSchema, NormalLeft extends TSchema = TDistributeNormalize<Left>, NormalRight extends TSchema = TDistributeNormalize<Right>, IsObjectLeft extends boolean = TCanDistribute<NormalLeft>, IsObjectRight extends boolean = TCanDistribute<NormalRight>, Result extends TSchema = ([
    IsObjectLeft,
    IsObjectRight
] extends [true, true] ? TComposite<TEvaluateType<NormalLeft>, NormalRight> : [
    IsObjectLeft,
    IsObjectRight
] extends [true, false] ? TEvaluateType<NormalLeft> : [
    IsObjectLeft,
    IsObjectRight
] extends [false, true] ? NormalRight : TNarrow<TEvaluateType<NormalLeft>, NormalRight>)> = Result;
type TDistributeType<Type extends TSchema, Distribution extends TSchema[], Result extends TSchema[] = []> = (Distribution extends [infer Left extends TSchema, ...infer Right extends TSchema[]] ? TDistributeType<Type, Right, [...Result, TDistributeOperation<Type, Left>]> : Result extends [] ? [Type] : Result);
type TDistributeUnion<Types extends TSchema[], Distribution extends TSchema[], Result extends TSchema[] = []> = (Types extends [infer Left extends TSchema, ...infer Right extends TSchema[]] ? TDistributeUnion<Right, Distribution, [...Result, ...TDistribute<[Left], Distribution>]> : Result);
export type TDistribute<Types extends TSchema[], Result extends TSchema[] = []> = (Types extends [infer Left extends TSchema, ...infer Right extends TSchema[]] ? Left extends TUnion<infer UnionTypes extends TSchema[]> ? TDistribute<Right, TDistributeUnion<UnionTypes, Result>> : TDistribute<Right, TDistributeType<Left, Result>> : Result);
export declare function Distribute<Types extends TSchema[]>(types: [...Types], result?: TSchema[]): TDistribute<Types>;
export {};
