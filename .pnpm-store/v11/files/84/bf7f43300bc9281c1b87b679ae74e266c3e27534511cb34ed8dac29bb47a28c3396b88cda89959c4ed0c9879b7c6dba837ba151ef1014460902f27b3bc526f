import { type TSchema, type TSchemaOptions } from '../types/schema.mjs';
import { type TDeferred } from '../types/deferred.mjs';
import { type TInstantiate } from '../engine/instantiate.mjs';
/** Creates a deferred Uncapitalize action. */
export type TUncapitalizeDeferred<Type extends TSchema> = (TDeferred<'Uncapitalize', [Type]>);
/** Creates a deferred Uncapitalize action. */
export declare function UncapitalizeDeferred<Type extends TSchema>(type: Type, options?: TSchemaOptions): TUncapitalizeDeferred<Type>;
/** Applies a Uncapitalize action to the given type. */
export type TUncapitalize<Type extends TSchema> = (TInstantiate<{}, TUncapitalizeDeferred<Type>>);
/** Applies a Uncapitalize action to the given type. */
export declare function Uncapitalize<Type extends TSchema>(type: Type, options?: TSchemaOptions): TUncapitalize<Type>;
