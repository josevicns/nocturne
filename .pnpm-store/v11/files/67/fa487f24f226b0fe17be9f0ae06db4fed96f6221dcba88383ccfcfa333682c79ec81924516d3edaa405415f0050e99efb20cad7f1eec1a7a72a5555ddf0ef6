import { type TSchema, type TSchemaOptions } from '../types/schema.mjs';
import { type TDeferred } from '../types/deferred.mjs';
import { type TInstantiate } from '../engine/instantiate.mjs';
/** Creates a deferred Partial action. */
export type TPartialDeferred<Type extends TSchema> = (TDeferred<'Partial', [Type]>);
/** Creates a deferred Partial action. */
export declare function PartialDeferred<Type extends TSchema>(type: Type, options?: TSchemaOptions): TDeferred<"Partial", [Type]>;
/** Applies a Partial action to the given type. */
export type TPartial<Type extends TSchema> = (TInstantiate<{}, TPartialDeferred<Type>>);
/** Applies a Partial action to the given type. */
export declare function Partial<Type extends TSchema>(type: Type, options?: TSchemaOptions): TPartial<Type>;
