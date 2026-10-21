import { type TSchema, type TSchemaOptions } from '../types/schema.mjs';
import { type TDeferred } from '../types/deferred.mjs';
import { type TInstantiate } from '../engine/instantiate.mjs';
/** Creates a deferred ReturnType action. */
export type TReturnTypeDeferred<Type extends TSchema> = (TDeferred<'ReturnType', [Type]>);
/** Creates a deferred ReturnType action. */
export declare function ReturnTypeDeferred<Type extends TSchema>(type: Type, options?: TSchemaOptions): TReturnTypeDeferred<Type>;
/** Applies a ReturnType action to the given type. */
export type TReturnType<Type extends TSchema> = (TInstantiate<{}, TReturnTypeDeferred<Type>>);
/** Applies a ReturnType action to the given type. */
export declare function ReturnType<Type extends TSchema>(type: Type, options?: TSchemaOptions): TReturnType<Type>;
