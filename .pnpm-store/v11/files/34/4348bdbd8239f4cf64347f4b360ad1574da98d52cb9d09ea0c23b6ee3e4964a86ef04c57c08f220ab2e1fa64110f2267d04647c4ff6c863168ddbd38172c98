import { type TProperties } from '../../types/properties.mjs';
import { type TSchema } from '../../types/schema.mjs';
import { type TEvaluateUnion } from '../evaluate/evaluate.mjs';
import { type TToIndexableKeys } from '../indexable/to-indexable-keys.mjs';
type TSelectProperty<Properties extends TProperties, Key extends string, PropertyKey extends string = keyof Properties extends string | number ? `${keyof Properties}` : never, Result extends TSchema[] = Key extends PropertyKey ? [Properties[Key]] : []> = Result;
type TSelectProperties<Properties extends TProperties, Keys extends string[], Result extends TSchema[] = []> = (Keys extends [infer Left extends string, ...infer Right extends string[]] ? TSelectProperties<Properties, Right, [...Result, ...TSelectProperty<Properties, Left>]> : Result);
export type TFromObject<Properties extends TProperties, Indexer extends TSchema, Keys extends string[] = TToIndexableKeys<Indexer>, Variants extends TSchema[] = TSelectProperties<Properties, Keys>, Result extends TSchema = TEvaluateUnion<Variants>> = Result;
export declare function FromObject<Properties extends TProperties, Indexer extends TSchema>(properties: Properties, indexer: Indexer): TFromObject<Properties, Indexer>;
export {};
