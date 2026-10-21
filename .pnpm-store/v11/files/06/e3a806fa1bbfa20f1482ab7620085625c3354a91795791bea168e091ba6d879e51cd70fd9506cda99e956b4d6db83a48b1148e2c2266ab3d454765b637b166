import { Memory } from '../../../system/memory/index.mjs';
import { type TSchema, type TSchemaOptions } from '../../types/schema.mjs';
import { type TProperties } from '../../types/properties.mjs';
import { type TObject } from '../../types/object.mjs';
import { type TToIndexableKeys } from '../indexable/to-indexable-keys.mjs';
import { type TToIndexable } from '../indexable/to-indexable.mjs';
import { type TPickDeferred } from '../../action/pick.mjs';
import { type TState, type TInstantiateType, type TCanInstantiate } from '../instantiate.mjs';
type TComparable<Indexable extends TProperties> = keyof Indexable extends string | number ? `${keyof Indexable}` : never;
type TFromKeys<Indexable extends TProperties, Keys extends string[], Result extends TProperties = {}> = (Keys extends [infer Left extends string, ...infer Right extends string[]] ? Left extends TComparable<Indexable> ? TFromKeys<Indexable, Right, Memory.TAssign<Result, {
    [_ in Left]: Indexable[Left];
}>> : TFromKeys<Indexable, Right, Result> : Result);
type TPickAction<Type extends TSchema, Indexer extends TSchema, Indexable extends TProperties = TToIndexable<Type>, Keys extends string[] = TToIndexableKeys<Indexer>, Applied extends TProperties = TFromKeys<Indexable, Keys>, Result extends TSchema = TObject<Applied>> = Result;
type TPickImmediate<Context extends TProperties, State extends TState, Type extends TSchema, Indexer extends TSchema, InstantiatedType extends TSchema = TInstantiateType<Context, State, Type>, InstantiatedIndexer extends TSchema = TInstantiateType<Context, State, Indexer>> = TPickAction<InstantiatedType, InstantiatedIndexer>;
export type TPickInstantiate<Context extends TProperties, State extends TState, Type extends TSchema, Indexer extends TSchema> = TCanInstantiate<Context, [Type, Indexer]> extends true ? TPickImmediate<Context, State, Type, Indexer> : TPickDeferred<Type, Indexer>;
export declare function PickInstantiate<Context extends TProperties, State extends TState, Type extends TSchema, Indexer extends TSchema>(context: Context, state: State, type: Type, indexer: Indexer, options: TSchemaOptions): TPickInstantiate<Context, State, Type, Indexer>;
export {};
