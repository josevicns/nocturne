import { type TSchema, type TSchemaOptions } from '../types/schema.mjs';
import { type TDeferred } from '../types/deferred.mjs';
import { type TInstantiate } from '../engine/instantiate.mjs';
/** Creates a deferred Awaited action. */
export type TAwaitedDeferred<Type extends TSchema> = (TDeferred<'Awaited', [Type]>);
/** Creates a deferred Awaited action. */
export declare function AwaitedDeferred<Type extends TSchema>(type: Type, options?: TSchemaOptions): TAwaitedDeferred<Type>;
/** Applies an Awaited action to a type. */
export type TAwaited<Type extends TSchema> = (TInstantiate<{}, TAwaitedDeferred<Type>>);
/** Applies an Awaited action to a type. */
export declare function Awaited<Type extends TSchema>(type: Type, options?: TSchemaOptions): TAwaited<Type>;
