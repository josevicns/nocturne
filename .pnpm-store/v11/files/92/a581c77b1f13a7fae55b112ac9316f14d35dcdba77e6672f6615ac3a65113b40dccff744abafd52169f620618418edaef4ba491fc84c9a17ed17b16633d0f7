import { type TSchema, type TSchemaOptions } from '../../types/schema.mjs';
import { type TProperties } from '../../types/properties.mjs';
import { type TObject } from '../../types/object.mjs';
import { type TToIndexableKeys } from '../indexable/to-indexable-keys.mjs';
import { type TToIndexable } from '../indexable/to-indexable.mjs';
import { type TOmitDeferred } from '../../action/omit.mjs';
import { type TState, type TInstantiateType, type TCanInstantiate } from '../instantiate.mjs';
type TNormalKeys<Keys extends string[], UnionKeys extends string = Keys[number], Result extends string | number = (UnionKeys extends `${infer Value extends number}` ? UnionKeys | Value : UnionKeys)> = Result;
type TFromKeys<Properties extends TProperties, Keys extends string[], Omitted extends TProperties = Omit<Properties, TNormalKeys<Keys>>, Result extends TProperties = {
    [Key in keyof Omitted]: Omitted[Key];
}> = Result;
type TOmitAction<Type extends TSchema, Indexer extends TSchema, Indexable extends TProperties = TToIndexable<Type>, IndexableKeys extends string[] = TToIndexableKeys<Indexer>, Omitted extends TProperties = TFromKeys<Indexable, IndexableKeys>, Result extends TSchema = TObject<Omitted>> = Result;
type TOmitImmediate<Context extends TProperties, State extends TState, Type extends TSchema, Indexer extends TSchema, InstantiatedType extends TSchema = TInstantiateType<Context, State, Type>, InstantiatedIndexer extends TSchema = TInstantiateType<Context, State, Indexer>, Result extends TSchema = TOmitAction<InstantiatedType, InstantiatedIndexer>> = Result;
export type TOmitInstantiate<Context extends TProperties, State extends TState, Type extends TSchema, Indexer extends TSchema> = TCanInstantiate<Context, [Type, Indexer]> extends true ? TOmitImmediate<Context, State, Type, Indexer> : TOmitDeferred<Type, Indexer>;
export declare function OmitInstantiate<Context extends TProperties, State extends TState, Type extends TSchema, Indexer extends TSchema>(context: Context, state: State, type: Type, indexer: Indexer, options: TSchemaOptions): TOmitInstantiate<Context, State, Type, Indexer>;
export {};
