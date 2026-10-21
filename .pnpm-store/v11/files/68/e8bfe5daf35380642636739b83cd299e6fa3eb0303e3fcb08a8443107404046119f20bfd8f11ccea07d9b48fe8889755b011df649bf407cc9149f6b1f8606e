import { type TSchema, type TSchemaOptions } from '../types/schema.mjs';
import { type TDeferred } from '../types/deferred.mjs';
import { type TKeysToIndexer } from '../engine/helpers/keys-to-indexer.mjs';
import { type TInstantiate } from '../engine/instantiate.mjs';
/** Creates a deferred Index action. */
export type TIndexDeferred<Type extends TSchema, Indexer extends TSchema> = (TDeferred<'Index', [Type, Indexer]>);
/** Creates a deferred Index action. */
export declare function IndexDeferred<Type extends TSchema, Indexer extends TSchema>(type: Type, indexer: Indexer, options?: TSchemaOptions): TIndexDeferred<Type, Indexer>;
/** Applies a Index action using the given types. */
export type TIndex<Type extends TSchema, Indexer extends TSchema> = (TInstantiate<{}, TIndexDeferred<Type, Indexer>>);
/** Applies a Index action using the given types. */
export declare function Index<Type extends TSchema, Indexer extends PropertyKey[]>(type: Type, indexer: [...Indexer], options?: TSchemaOptions): TIndex<Type, TKeysToIndexer<Indexer>>;
/** Applies a Index action using the given types. */
export declare function Index<Type extends TSchema, Indexer extends TSchema>(type: Type, indexer: Indexer, options?: TSchemaOptions): TIndex<Type, Indexer>;
